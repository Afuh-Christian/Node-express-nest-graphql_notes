const express = require('express')   
const rootrouter = express.Router() 
const path = require('path') 


rootrouter.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"..","views", "index.html"))
}) 

rootrouter.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"..","views", "new-page.html"))
})

rootrouter.get('/old-page(.html)?',(req,res) => {
    res.redirect(301, '/new-page.html')
})


rootrouter.get("/home(.html)?" , (req, res , next) => {
    next()
}, (req, res) => {
    res.send("This is the Next Route Handler")
})


rootrouter.get("/happy(.html)?" , (req, res) => {
    res.send("This is the Next Route Handler")
})


const one = (req,res, next) => {
    console.log("One") 
    next() 
}
const two = (req,res, next) => {
    console.log("Two") 
    next() 
}
const three = (req,res) => {
    console.log("three") 
    res.send("This is three")
}


rootrouter.get("/number(.html)?", [one, two , three])

rootrouter.get("/Ahome(.html)?", (req, res) => {
    res.send("datadsf adfdfa")
})

rootrouter.all("*" ,(req, res) => {
    res.status(404)
        if(req.accepts(".html")){
            res.sendFile(path.join(__dirname,"views" , "404.html"))
        }else if(req.accepts(".json")){
            res.json({error: "404 Not found"})
        }else {
            res.type("txt").send("404 : Not found")
        }
        
})





module.exports = rootrouter 


