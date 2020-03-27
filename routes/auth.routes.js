const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

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

router.get('/game', auth,
    async (req, res)=>{
        try{
            const {name, _id} = await User.find({_id: req.user.userId})
            res.json(name)
        } catch (e) {
            res.status(500).json({message: 'Something go wrong, try again'})
            console.log(e)
        }
    })


module.exports = router