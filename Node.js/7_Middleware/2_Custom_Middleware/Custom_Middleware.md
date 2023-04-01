# CUSTOM MIDDLEWARE...

# custom Middleware logger .. at the top ... above the built in

    -app.use((req, res, next)=>{})

# the built-in middleware has the next() built into it ... , here we have to explicitly define it since it's custom

# custom Middleware logger

// custom middleware logger
app.use((req, res , next)=>{
console.log(`${req.method}\t ${req.path}`)
next()
})

http://localhost:3500/

# we will use the log event File we created ...

#

    -create folder = middleware
    -place the logEvens.js in the middleware folder
    -change where the  logs file is being created .. so that it should not be created in the middleware folder
        await fsPromises.mkdir(path.join(__dirname,'..','logs'))

# ... logEvents.js

const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message,logName) => { // add the logName parameter
const dateTime = `${format(new Date() , "yyyyMMdd\tHH:mm:ss")}`
const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    console.log(logItem)

    try{

# .....

        if (!fs.existsSync(path.join(__dirname,'..','logs'))) {
           await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs', logName),logItem)  //replace eventlog with logName
    }

# .....

    catch(err){
        console.log(err)
    }

}

module.exports = logEvents

# ...............

# now import the logEvent in the server.js

# .....

const logEvents = require('./middleware/logEvents')

# .....

const PORT = process.env.PORT || 3500

# .....

app.use((req, res , next)=>{
logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
console.log(`${req.method}\t ${req.path}`)
next()
})

# .....

# .... A much Cleaner way to do this is \

    -Assign the annonymous function in the logEvents.js
    -export the function ,
    -call it in the app.use()

# logEvents.js                             
                                                   
const logger = (req, res , next)=>{
logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
console.log(`${req.method}\t ${req.path}`)
next()
}

module.exports = {logEvents,logger}

# server.js

const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger)
