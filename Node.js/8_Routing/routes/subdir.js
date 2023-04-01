const express = require('express') 
const subdirrouter = express.Router() 
const path = require('path') 


subdirrouter.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"..","views","subdir", "index.html"))
})
subdirrouter.get('/test(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"..","views","subdir", "test.html"))
})


module.exports = subdirrouter