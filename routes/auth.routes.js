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
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/2eb6c29c7ab24b9482f7a5bce63b8176'));
const fs = require('fs');
const imgGen = require('js-image-generator');

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
        let _friendId = ''
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(400).json({
                errors: errors.array(),
                message: errors.array()[0].msg
            })
        }

        const {name, email, password, wallet, friendId, macthPassword} = req.body
        console.log('start new creating user')
        let candidate = await User.findOne({name})
        if(candidate){
            return res.status(400).json({message: 'This user is already exist'})
        }
        console.log('name is ok')
        candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'This email is already exist'})
        }
        console.log('email is ok')
        if(macthPassword!==password){
            return res.status(400).json({message: 'Passwords do not match'})
        }
        console.log('password is ok')

        if(!web3.utils.isAddress(wallet)) {
            return res.status(400).json({message: 'Address is not valid'})
        }
        console.log('address is valid')
        candidate = await User.findOne({wallet})
        if(candidate){
            return res.status(400).json({message: 'This wallet is already exist'})
        }

        console.log('address is ok')
        if(friendId!=''){
            let friend = await User.findOne({wallet: friendId})
            let friend2 = await User.findOne({name: friendId})
            let friend3 = await User.findOne({_id: friendId})
            console.log('friend2', friend2)
            if(!friend && !friend2 && !friend3){
                return res.status(400).json({message: `This friend is not exist in system`})
            } else{
                if(wallet===friendId || name===friendId) {
                    return res.status(400).json({message: `You can't put your data in Friend ID`})
                }
            }
            _friendId = friend?friend.wallet:friend2?friend2.wallet:friend3.wallet
        }
        console.log('friend is ok')
        function generateHash(string) {
            var hash = 0;
            if (string.length == 0)
                return hash;
            for (let i = 0; i < string.length; i++) {
                var charCode = string.charCodeAt(i);
                hash = ((hash << 7) - hash) + charCode;
                hash = hash & hash;
            }
            return hash;
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log('user creating')
        const user = new User({name, email, password: hashedPassword, wallet, friendId: _friendId})
        await user.save()
        console.log('user: ', user)
        imgGen.generateImage(800, 800, 80, function(err, image) {
            fs.writeFileSync(path.join(__dirname, '../client/src/avatars/')+user._id+'.jpg', image.data);
        });
        res.status(201).json({message: "User created!"})

    }catch (e) {
        console.log(e)
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

router.get('/friends', auth,
    async (req, res)=>{
        try{
            // const userAddress = await User.find({_id: req.user.userId})
            // console.log("userAddress: ", userAddress[0].wallet)
            // const userData = await User.find({friendId: userAddress[0].wallet})
            // res.json(userData)
            // console.log("Friends")
            // console.log(userData)
            console.log('start getting friends')
            const userAddress = await User.find({_id: req.user.userId})
            console.log("userAddress: ", userAddress[0].wallet)
            let refContract = "0x6E712549EFE403866BCd2D405f66672DD59a90D4"
            let refAbi = [{"constant":false,"inputs":[{"name":"_contr","type":"address"}],"name":"addContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referrer","type":"address"}],"name":"addReferer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_refCashbox","type":"address"}],"name":"changeRefCashbox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newManager","type":"address"}],"name":"setManagment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sevenTOP","type":"address"}],"name":"setSevenTOP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_storageLimitLottery","type":"address"}],"name":"setStorageLimitLottery","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"player","type":"address"},{"indexed":false,"name":"referrer","type":"address"}],"name":"ReferrerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contracts","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getReferal","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getReferers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"management","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"refCashbox","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sevenTOP","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"storageLimitLottery","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
            let RefStorage = new web3.eth.Contract(refAbi, refContract)
            let userData = []
            let friendsAddresses = await RefStorage.methods.getReferers(userAddress[0].wallet).call({}, (err, res) => {
                if (res) {
                    return res
                } else if (err) {
                    console.log("This is error: ", err);
                    return null;
                }
            })
            console.log('friendsAddresses: ', friendsAddresses)

            for(let i=0; i<friendsAddresses.length; i++){
                let result = await User.find({wallet: friendsAddresses[i]})
                if(!result.length){
                    let data = {_id: 'undefined', name: (friendsAddresses[i].substr(0, 6) + "..." + friendsAddresses[i].substr(38, 4))}
                    userData.push(data)
                } else {
                    userData.push(result[0])
                }
            }
            res.json(userData)
            console.log("Friends")
            console.log(userData)

        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }
    })

router.get('/allusers', auth,
    async (req, res)=>{
        try{
            const user = await User.find({_id: req.user.userId})
            // const _friends = await User.find({friendId: user[0].wallet})
            let refContract = "0x6E712549EFE403866BCd2D405f66672DD59a90D4"
            let refAbi = [{"constant":false,"inputs":[{"name":"_contr","type":"address"}],"name":"addContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referrer","type":"address"}],"name":"addReferer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_refCashbox","type":"address"}],"name":"changeRefCashbox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newManager","type":"address"}],"name":"setManagment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sevenTOP","type":"address"}],"name":"setSevenTOP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_storageLimitLottery","type":"address"}],"name":"setStorageLimitLottery","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"player","type":"address"},{"indexed":false,"name":"referrer","type":"address"}],"name":"ReferrerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contracts","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getReferal","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getReferers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"management","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"refCashbox","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sevenTOP","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"storageLimitLottery","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
            let RefStorage = new web3.eth.Contract(refAbi, refContract)
            const _friends = await RefStorage.methods.getReferers(user[0].wallet).call({}, (err, res) => {
                if (res) {
                    console.log('friends count: ', res)
                    return res
                } else if (err) {
                    console.log("This is error: ", err);
                    return [];
                }
            })
            const _allUsers = await User.find()
            res.json({friends: _friends.length, allUsers: _allUsers.length})
            console.log("Friends")
            console.log(userData)
        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }
    })


router.post('/members',

    async (req, res)=>{
        try{
            let members = req.body
            console.log('req.body members: ', members)

            let users = []
            for(let i=0; i<members.length; i++){
                let user = await User.findOne({wallet: members[i]})
                console.log('cc')
                console.log(user)
                if(!user){
                    users.push({id: 'undefined', name: members[i].substr(0, 6) + "..." + members[i].substr(38, 4)})
                } else{
                    users.push({id: user._id, name: user.name})
                }
            }

            // console.log(users)
            if(!users){
                return res.status(400).json({message: "User is not exist"})
            }
            console.log("MembersStruct: ", users)
            res.json(users)

        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }

    })

router.post('/winners',

    async (req, res)=>{
        try{
            let members = req.body
            console.log('req.body: ', members)

            let users = []
            for(let i=0; i<members.length; i++){
                let user = await User.findOne({wallet: members[i][0]})
                console.log(user)
                if(!user){
                    users.push({ name: members[i][0].substr(0, 6) + "..." + members[i][0].substr(38, 4), time: members[i][1], sum: members[i][2], id: 'undefined'})
                } else{
                    users.push({name: user.name, time: members[i][1], sum: members[i][2], id: user._id})
                }
            }

            // console.log(users)
            if(!users){
                return res.status(400).json({message: "User is not exist"})
            }
            console.log("Winners: ", users)
            res.json(users)

        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }

    })

module.exports = router