'use strict';

let express= require('express')
    ,multer = require('multer')
    ,app = express()

    //Import imgProcessor module which we would implement later
    ,imgProc = require('./imgProcessor');


var maxSize = 5 * 1024 * 1024 ;
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log(file);


    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback({error:1} ,false);
    }
    
    callback(null, Date.now() + file.originalname);
  }
});


var upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
}).array('pics');
app.use(express.static(__dirname + '/uploads'));
var up = multer();


app.get('/', (req, res, next)=>{
    res.sendFile(__dirname+'/main.html');
});


app.get('/master', (req, res, next)=>{
    res.sendFile(__dirname+'/master.html');
});

app.get('/demo', (req, res, next)=>{
    res.sendFile(__dirname+'/index.html');
});

app.use(express.static(__dirname + '/public'));

app.post('/uploadImg', upload, (req, res, next)=>{
console.log(req.files);
            /*imgProc.convertImgs(req.files).then((imageStringArray)=>{

        //After all image processing finished, send the base64 image string to client
     
        res.json(imageStringArray)

    })*/
       res.json({ok:1,nombre:req.files })
});


app.post('/uploadImg', up.array('pics'), (req, res, next)=>{
console.log(req.files+'asdasdadasdasd');
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