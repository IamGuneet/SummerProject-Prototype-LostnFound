const { log } = require('console')
const { url } = require('inspector')
const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const fs = require('fs')
const admin = require("firebase-admin")
const upload = multer({storage: multer.memoryStorage()})
const firebase = require("firebase/app")
const storageObj = require("firebase/storage")
const serviceAccount = require('./gitamlostnfound-firebase-adminsdk-59qgz-8cb94ac7b8.json')

// importing schemaObj
const loginCred = {
    'username': process.env.LOGIN_USER,
    'password': process.env.LOGIN_PASSWORD
}
const imgAddress = [
    'https://www.bigbasket.com/media/uploads/p/m/40288874_1-milton-kool-hexone-insulated-water-bottle-bpa-free-leak-proof-red.jpg',
    'https://cdn.shopify.com/s/files/1/0057/8938/4802/products/pink_93d7a9ed-186f-4081-a184-bad918274e7b.png?v=1658994528',
    'https://black-shades.b-cdn.net/wp-content/uploads/2022/01/Rock-Star-4-of-5.jpg',
    'https://m.media-amazon.com/images/I/81SC8kmwFQL._SL1500_.jpg'
]
// config file
// initalize firebase app
const config  = require('./firebase/firebase')
// initialize cloud storage9
firebase.initializeApp(config)


// Getting the img url from cloud
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    storageBucket:'gs://gitamlostnfound.appspot.com'
})
const bucket = admin.storage().bucket()

// async function getImageURLsFromFolder(folderPath) {
//     const [files] = await bucket.getFiles({
//       prefix: folderPath
//     });
  
//     const imageURLs = [];
  
//     for (const file of files) {
//         const [metadata] = await file.getMetadata();
//         const address = metadata.mediaLink;
  
//        imageURLs.push(address)
//     }
  
//     return imageURLs;
//   }
//   const folderPath = 'LostItems/'
//   let tempUrl = []
//   getImageURLsFromFolder(folderPath)
//   .then((response)=>
//   {
//     console.log(response);
//     tempUrl=response
// })
//   .catch((err)=>{console.log(err);})


// Db model
const lostObj = require('./database/schema')
// password check
const checkPassword = require('./login/login')

// Urls of imgs from bucket
const getstorage = storageObj.getStorage()
const listRef = storageObj.ref(getstorage,'LostItems')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// port
const port = process.env.PORT || 3000

// Routes 

app.get('/items', async (req, res) => {
    try {
        const files = await bucket.getFiles()
        const imgFiles = files[0].map((file)=>{
            return file.publicUrl()
        })
        // console.log(imgFiles);
    const dbData = await lostObj.find({})
                const resObject ={
                    dbData: dbData,
                    urlList:imgAddress
                }
                res.status(200).json(resObject)
            } catch (error) {
                console.error('Error retrieving data:', error);
                res.status(500).send('Error retrieving data');
            }
})

// logging in 
app.post('/login', bodyParser.json(), (req, res) => {

    let temp = false
    const { username, password } = req.body
    try {
        // login cred checking
        temp = checkPassword(loginCred, username, password)
    } catch (e) {
        console.log(e.message);
    }
    // redirecting based on state of login cred
    if (temp) {
        console.log('valid login');
        res.status(200).redirect('http://127.0.0.1:5173/addObject')
    } else {
        console.log('invalid login');
        res.status(403).redirect('http://127.0.0.1:5173/error')
    }


})

app.post('/login/addItem', upload.single('file'), async (req, res) => {
    const body = req.body
    let temp = false;
    // new Item document for Db
    const lostItem = new lostObj({
        title: body.title,
        contact: body.contact,
        foundAt: body.location,
        description: body.description,
    })
    temp = true
    // saving
    lostItem.save()
        .then(() => { console.log('saved to db') })
        .catch((e) => { temp = false, console.log(e); })
    // img to firebase cloud
        try{
            const dateTime = Date.now()
            //storage refrence inside the bucket
            const storageRef = storageObj.ref(getstorage,`LostItems/${req.file.originalname + " "+ dateTime}`) 
            // file metadata
            const metadata = {
                contentType: req.file.mimetype
            }
            //Upload the file in the bucket
        const snapshot = await storageObj.uploadBytesResumable(storageRef,req.file.buffer,metadata).then(()=>console.log('uploadingfile')).catch((e)=>{console.log(e.message);})
        console.log("file uploaded");
    }catch(error){
        console.log(error.message);
    }       
    return res.status(200).send({
        status:200,
        message:'file uploaded to firebase'
    })

}
);

app.delete('/deleteItem', bodyParser.json(), (req, res) => {
    let temp = false
    try {
        const idData = JSON.parse(req.headers['id-data'])
        lostObj.deleteOne({ _id: idData.id })
            .then(() => {
                temp = true
                console.log("Item deleted");
            }).catch((e) => { console.log(e); })
    } catch (e) {
        console.log(e.message);
    }
    if (temp == true) {
        res.status(200).redirect("http://127.0.0.1:5173/addObject/success")
    } else {
        res.status(404).redirect("http://127.0.0.1:5173/error")
    }

})

//only running the server if connection to the db is established

mongoose.connect(`mongodb+srv://RootGuneet:${process.env.MONGO_DB}@cluster0.xvazlgc.mongodb.net/?retryWrites=true&w=majority/lonstnFound`)
    .then(() => {
        console.log('Db connection established');

        app.listen(port, () => {
            console.log(`running on port ${port}`);
        })
    }).catch((e) => {
        console.log('error in connection:', e);
    })
