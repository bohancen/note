const fs = require('fs')
const util = require('util')
const readAsync = util.promisify(fs.readFile)

// fs.readFile('./data.json','utf-8',(err,data)=>{
//   if(err){
//     return console.log(err)
//   }

//   data = JSON.parse(data)
//   console.log(data.name)
// })


// readAsync('./data.json','utf-8')
//   // .then(JSON.parse)
//   .then(data=>{
//     console.log(data)
//     // console.log(JSON.parse(data))
//   })
//   .catch(err=>{
//     console.log(err)
//   })


async function init(){
  try{
    let data = await readAsync('./data1.json','utf-8')
    // let data = await readAsync('./data.json','utf-8')
    console.log(data)
  }catch(err){
    console.log('err')
    console.log(err)
  }
}
init()
