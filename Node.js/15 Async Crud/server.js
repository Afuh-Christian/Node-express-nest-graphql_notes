
require('dotenv').config(); 
const express = require('express') 
const app = express()
const path = require('path')
const { ppid } = require('process')
const { logger } = require('./middleware/logEvents')
const  PORT = process.env.PORT || 3500
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const rootrouter = require('./routes/root')
const { employeerouter } = require('./routes/api/employees')
const { parseArgs } = require('util')
const { corsOptions } = require('./config/corsOptions')
const { registerrouter } = require('./routes/api/register')
const { authrouter } = require('./routes/api/auth')
const { verifyJWT } = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')    

const { refreshTokenRouter } = require('./routes/api/refresh')
const { logoutRouter } = require('./routes/api/logout')
const { credentials } = require('./middleware/credentials')

const mongoose = require('mongoose');
const { connectDB } = require('./config/dbConn');

//Connect to MongoDB 
connectDB()

//custom middleware logger
app.use(logger)

// cors-credentials ..
app.use(credentials)

// cors 
app.use(cors(corsOptions))

// Built-in Middleware for form-data
app.use(express.urlencoded({extended: false}))

// Built-in Middleware for json
app.use(express.json())

//middleware for cookie 
app.use(cookieParser())

// Serve static files 
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/employees",express.static(path.join(__dirname,"public")))

//Routes.. 
app.use('/', rootrouter)
app.use('/login' ,authrouter)
app.use('/register', registerrouter)


//RefreshTokenRoute
app.use('/refresh',refreshTokenRouter )

// logout ..
app.use('/logout',logoutRouter)

app.use(verifyJWT)
app.use('/employees', employeerouter)



// app.all("*" ,(req, res) => {
//     res.status(404)
//         if(req.accepts(".html")){
//             res.sendFile(path.join(__dirname,"views" , "404.html"))
//         }else if(req.accepts(".json")){
//             res.json({error: "404 Not found"})
//         }else {
//             res.type("txt").send("404 : Not found")
//         } 
// })


// api route 

// sample route 

// Errors .... 
app.use(errorHandler)



mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT , () => {
        console.log(`Server running at port ${PORT}`)
    })
})


                  











    