
const { response } = require('express')
const express = require('express') 
const app = express()
const path = require('path')
const  PORT = process.env.PORT || 3500

app.get('^/$|/index(.html)?',(request,response) => {
    response.sendFile(path.join(__dirname,"views", "index.html"))
})
app.get('/new-page(.html)?',(request,response) => {
    response.sendFile(path.join(__dirname,"views", "new-page.html"))
})

// Redirect
app.get('/old(.html)?',(request,response) => {
    response.redirect(301, '/new-page')
})

//Route Handlers 

app.get("/home(.html)?" , (req, res , next) => {
    next()
}, (req, res) => {
    res.send("This is the Next Route Handler")
})

// Method 2 , Route Handlers  


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



app.get("/number(.html)?", [one, two , three])


// Get all wrong routes .... 
app.get("/*" ,(request, response) => {
    response.status(404).sendFile(path.join(__dirname,"views" , "404.html"))
})

app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})

    