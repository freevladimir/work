const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const gridFS = require('mongo-gridfs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
app.use(express.json({extended: true}))
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        // await gridFS.MongoGridFS(mongoose, "attachments")
        // gridFS.downloadFile("59e085f272882d728e2fa4c2", {
        //     filename: "user.jpg",
        //     targetDir: "/client/src/img"
        // }).then((downloadedFilePath) => {
        //     console.log(downloadedFilePath);
        // }).catch((err) => {
        //     console.error(err);
        // });
        app.listen(PORT, ()=>console.log(`App has been started ${PORT}...`))
   } catch (e) {
       console.log('Server Error', e.message)
       process.exit(1)
   }

}

start()
