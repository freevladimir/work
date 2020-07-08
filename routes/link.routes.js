// const {Router} = require('express')
// const Link = require('../models/Link')
// const auth = require('../middleware/auth.middleware')
// const router = Router()
// const User = require('../models/User')

// router.post('/generate', async(req, res)=>{
//     try{

//     }catch (e) {
//         res.status(500).json({message: 'Something go wrong, try again'})
//     }
// })

// router.get('/allusers', async (req, res)=>{
//     try{
//         const users = await User.find()
//         res.json(users)
//     }catch (e) {
//         res.status(500).json({message: 'Something go wrong, try again'})
//     }
// })

// router.get('/:id', async (req, res)=>{
//     try{
//         const link = await Link.findById(req.params.id)
//         res.json(link)
//     }catch (e) {
//         res.status(500).json({message: 'Something go wrong, try again'})
//     }
// })

// router.post('/api/link/upload', function(req, res) {
//     console.log('api/link')
//   console.log('body: ', req.body)
//   console.log('files: ', req.files)
//   console.log('file: ', req.file)

// });

// // router.post('/upload', function(req, res) {
// //   if (!req.files || Object.keys(req.files).length === 0) {
// //     return res.status(400).send('No files were uploaded.');
// //   }

// //   // The name of the input field (i.e. "avatar") is used to retrieve the uploaded file
// //   let avatar = req.files.avatar;

// //   // Use the mv() method to place the file somewhere on your server
// //   avatar.mv('/somewhere/on/your/server/filename.jpg', function(err) {
// //     if (err)
// //       return res.status(500).send(err);

// //     res.send('File uploaded!');
// //   });
// // });

// module.exports = router