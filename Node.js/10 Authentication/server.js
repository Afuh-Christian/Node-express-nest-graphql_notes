

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



//custom middleware logger
app.use(logger)

// cors 
app.use(cors(corsOptions))

// Built-in Middleware for form-data
app.use(express.urlencoded({extended: false}))

// Built-in Middleware for json
app.use(express.json())

// Serve static files 
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/employees",express.static(path.join(__dirname,"public")))

//Routes.. 
app.use('/login' ,authrouter)
app.use('/employees', employeerouter)
app.use('/register', registerrouter)
app.use('/', rootrouter)

// api route 

// sample route 

// Errors .... 
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})









    