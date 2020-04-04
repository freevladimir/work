const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')


const conn = mongoose.createConnection(config.get('mongoUrl'))
let gfs

conn.once('open', ()=>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
    url: config.get('mongoUrl'),
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage})



router.post('/avatar', async (req, res)=>{
    try{
        console.log('Avatar src: ', req.body)
        const {_id, userImg} = req.body
        await User.findByIdAndUpdate(_id, {userImg})
        res.status(201).json({message: "Avatar updated!"})
    } catch (e) {
        res.status(500).json({message: 'Something go wrong, try again', e})
    }
})

// /api/auth/register
router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min length of password is 6 symbols').isLength({min: 6})
    ],
    async (req, res)=>{
    try{
        console.log('Body', req.body)
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data on registration'
            })
        }

        const {name, email, password, wallet, friendId, macthPassword} = req.body
        let candidate = await User.findOne({name})
        if(candidate){
            return res.status(400).json({message: 'This user is already exist'})
        }
        candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'This email is already exist'})
        }
        if(macthPassword!==password){
            return res.status(400).json({message: 'Passwords do not match'})
        }
        await User.updateOne({name: name}, {userImg: img})
        if(friendId!=''){
            let friend = await User.findOne({wallet: friendId})
            if(!friend){
                return res.status(400).json({message: `This friend is not exist in system`})
            } else{
                if(wallet===friendId || name===friendId) {
                    return res.status(400).json({message: `You can't put your data in Friend ID`})
                }
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({name, email, password: hashedPassword, wallet, friendId})

        await user.save()

        res.status(201).json({message: "User created!"})

    }catch (e) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

// /api/auth/login
router.post('/login',
    [
        check('password', 'Insert password').exists()
    ],
    async (req, res)=>{
    try{
        console.log('Body:', req.body)
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data on login'
            })
        }
        const {name, password} = req.body
        const user = await User.findOne({name})
        if(!user){
            return res.status(400).json({message: "User is not exist"})
        }

        const isMacth = await bcrypt.compare(password, user.password)

        if(!isMacth){
            return res.status(400).json({message: 'Incorrect password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id, name: user.name})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong, try again'})
        console.log(e)
    }

})

router.get('/allgames', auth,
    async (req, res)=>{
        try{
            const userData = await User.find({_id: req.user.userId})
            res.json(userData)
            console.log("allGames is ok")
            console.log(userData[0]._id)

        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }
    })

router.get('/allgames', auth,
    async (req, res)=>{
        try{
            console.log("lalal")
            const {fileName} = await User.findOne({_id: req.user.userId})
            console.log(fileName)
            gfs.files.findOne({ fileName }, (err, file) => {
                // Check if file
                if (!file || file.length === 0) {
                    return res.status(404).json({
                        err: 'No file exists'
                    });
                }

                // Check if image
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    // Read output to browser
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image'
                    });
                }
            });
        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }
    })

// @route GET /
// @desc Loads form
// router.get('/allgames', (req, res) => {
//     console.log(gfs)
//     gfs.files.find().toArray((err, files) => {
//         // Check if files
//         if (!files || files.length === 0) {
//             res.render('index', { files: false });
//             console.log(files)
//         } else {
//             files.map(file => {
//                 if (
//                     file.contentType === 'image/jpeg' ||
//                     file.contentType === 'image/png'
//                 ) {
//                     file.isImage = true;
//                 } else {
//                     file.isImage = false;
//                 }
//             });
//             res.render('index', { files: files });
//             console.log(files)
//         }
//     });
// });

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/allGamesPage')
    // console.log(req.file)

});

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.json(files);
    });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

router.get('/game', auth,
    async (req, res)=>{
        try{
            const userData = await User.find({_id: req.user.userId})
            res.json(userData)
            console.log("allGames is ok")
            console.log(userData)
        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }
    })


module.exports = router