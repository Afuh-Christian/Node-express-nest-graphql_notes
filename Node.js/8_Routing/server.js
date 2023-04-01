

const express = require('express') 
const app = express()
const path = require('path')
const { ppid } = require('process')
const { logger } = require('./middleware/logEvents')
const  PORT = process.env.PORT || 3500
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const subdirrouter = require('./routes/subdir')
const rootrouter = require('./routes/root')
const { employeerouter } = require('./routes/api/employees')
const { parseArgs } = require('util')



//custom middleware logger
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
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/subdir",express.static(path.join(__dirname,"public")))
app.use("/employees",express.static(path.join(__dirname,"public")))

//Routes.. 
app.use('/employees', employeerouter)
app.use('/subdir', subdirrouter)
app.use('/', rootrouter)

// api route 


// sample route 


// Errors .... 
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})









    