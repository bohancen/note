const express = require('express')
const request = require('request')

const app = express()

app.use('/',(req,res)=>{
    // res.send('prosy')
    // console.log(Object.keys(req))
    // req.url = ''
    req.pipe(request('http://localhost:8899/',{qs:req.query})).pipe(res)
})

app.listen('8890',()=>{
    console.log('8890')
})