'use strict';

let express= require('express')
    ,multer = require('multer')
    ,upload = multer()
    ,app = express()

    //Import imgProcessor module which we would implement later
    ,imgProc = require('./imgProcessor');

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname+'/main.html');
});

app.use(express.static(__dirname + '/public'));

app.post('/uploadImg', upload.array('pics'), (req, res, next)=>{

    //Call the convertImgs method and pass the image files as its argument
    imgProc.convertImgs(req.files).then((imageStringArray)=>{

        //After all image processing finished, send the base64 image string to client
        res.json(imageStringArray)

    })
});
// http://markocen.github.io/blog/pre-processing-uploaded-image-on-nodejs.html
app.listen(8888, ()=>{
    console.log('Hosted on Port 8888')
});