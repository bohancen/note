const request = require('request')
const fs = require('fs')
const path = require('path')

request({
    url:'http://localhost:8890',
    method:'post',
    qs:{
        type:'dog'
    },
    // form:{
    //     name:'alpha'
    // },
    formData:{
        file: fs.createReadStream(path.resolve(__dirname,'./pic.jpg'))
    }
},(err,res,body)=>{
    if(err){
        return console.log(err)
    }
    console.log(body)
})