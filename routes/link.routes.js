const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', async(req, res)=>{
    try{

    }catch (e) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

router.get('/', async (req, res)=>{
    try{
        const links = await Link.find({owner: null})
        res.json(links)
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