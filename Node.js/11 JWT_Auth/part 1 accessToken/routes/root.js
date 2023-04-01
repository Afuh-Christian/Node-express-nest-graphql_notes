const express = require('express')   
const rootrouter = express.Router() 
const path = require('path') 


rootrouter.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"..","views", "index.html"))
}) 


module.exports = rootrouter 


