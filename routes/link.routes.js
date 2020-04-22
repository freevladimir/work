const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()
const User = require('../models/User')

router.post('/generate', async(req, res)=>{
    try{

    }catch (e) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

router.get('/allusers', async (req, res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch (e) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const link = await Link.findById(req.params.id)
        res.json(link)
    }catch (e) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

module.exports = router