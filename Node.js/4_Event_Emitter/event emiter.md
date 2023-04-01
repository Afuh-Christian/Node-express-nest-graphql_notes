# Event Emitter : We will learn 
    -How to Emitt custom event 
    -How to responed to the emitted events 


# LogEvents is important when working with servers 


# 1 create a logEvent file .. 
# logEvents is async 


const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 

const logEvents = async (message) => {
    const dateTime = `${format(new Date() , "yyyyMMdd\tHH:mm:ss")}`
    const logItem = `${dateTime}\t${uuid()}\t${message}` 

    console.log(logItem) 

    try{
        await fsPromises.appendFile(__dirname,'logs', 'eventLog.txt'),logItem
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    logEvents
}

# ....................................index.js.........................................................
const logEvents = require('./LogEvents');
# 2 import eventEmitter 
    const EventEmitter = require('events')
# create a class and extend the eventEmitter 
    class MyEmitter extends EventEmitter {}


# initialize the object 


# add listener for the log event
myEmitter.on('log',(msg)=> logEvents(msg))
    -.on   
        -1st parameter = name of event 
        -2nd parameter = callback function 



# now we need to emit this event to test this out 

# .emit() to emit the event 
    myEmitter.emit('log','Log Events Emitted') 

    -1st parameter = event type 
    -2nd parameter = console output

# We'll use a setTimeout() to demonstrate this 

# full code ............

# logEvents.js
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 

const logEvents = async (message) => {
    const dateTime = `${format(new Date() , "yyyyMMdd\tHH:mm:ss")}`
    const logItem = `${dateTime}\t${uuid()}\t${message}` 

    console.log(logItem) 

    try{
        if (!fs.existsSync(path.join(__dirname,'logs'))) {
           await fsPromises.mkdir(path.join(__dirname,'logs'))
        } 
        await fsPromises.appendFile(path.join(__dirname,'logs', 'eventLog.txt'),logItem)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = logEvents


# .............


# Index.js 

const logEvents = require('./logEvents');

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()


myEmitter.on('log',(msg)=> logEvents(msg))

setTimeout(() => {
    myEmitter.emit('log','Log Events Emitted') 
},2000) 
# ............



# .......................





# Event helps very much in web servers .. in monitoring the activities on the webserver 


