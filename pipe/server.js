const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty');
const app = express()

const multipartMiddleware = multipart();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

function get(obj,keys){
	if(typeof keys == 'number'){keys = keys+''}
	if(keys == undefined){return obj}
	
	if(!obj){
		return undefined
	}
  keys = keys.split('.')
  keys.forEach(function(key){
    if(obj && obj[key] != undefined){
      obj = obj[key]
    }else{
      obj = undefined
    }
  })
  return obj
}

app.post('/',multipartMiddleware,(req,res)=>{
    let filePath = get(req,'files.file.path')||''
    console.log(filePath)

    let sourceFile = filePath
    let destPath = path.resolve(__dirname,'download.jpg')
    let readStream = fs.createReadStream(sourceFile);
    let writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream);

    console.log(req.body, req.files);
    res.send({
        body:req.body,
        qs:req.query
    })
})

app.listen('8899',()=>{
    console.log('8899')
})