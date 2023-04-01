
const { res } = require('express')
const express = require('express') 
const app = express()
const path = require('path')
const { ppid } = require('process')
const { logger } = require('./middleware/logEvents')
const  PORT = process.env.PORT || 3500
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')

// custom middleware logger 
app.use(logger)



// 
const whiteList = ['http://localhost/3000','https://www.google.com']
const corsOptions = {
    origin : (origin,callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){ 
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus : 200
}
app.use(cors(corsOptions))




// Built-in Middleware for form-data
app.use(express.urlencoded({extended: false}))

// Built-in Middleware for json
app.use(express.json())

// Serve static files 
app.use(express.static(path.join(__dirname,"public")))

app.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"views", "index.html"))
})
app.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"views", "new-page.html"))
})

app.get('/old(.html)?',(req,res) => {
    res.redirect(301, '/new-page')
})


app.get("/home(.html)?" , (req, res , next) => {
    next()
}, (req, res) => {
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


app.get("/number(.html)?", [one, two , three])


app.all("*" ,(req, res) => {
    res.status(404)
        if(req.accepts(".html")){
            res.sendFile(path.join(__dirname,"views" , "404.html"))
        }else if(req.accepts(".json")){
            res.json({error: "404 Not found"})
        }else {
            res.type("txt").send("404 : Not found")
        }
        
})


// Errors .... 
app.use(errorHandler)


app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})

    