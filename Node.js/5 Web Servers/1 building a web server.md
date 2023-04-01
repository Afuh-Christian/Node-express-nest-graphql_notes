# we will build a web server with node js 
# no framework will be utilized 
# this will make us know foundational knowledge of node js 

# We will build servers from scratch without using any frameworks ..


# folders 
-css 
    -style.css
-data 
    -data.json
    -data.txt
-img 
-views
    -subdir 
        -index.html 
    -404.html
    -index.html 
    -new-page.html
# files 
-server.js 
-package.json 
   {
  "name": "3_npm_modules",
  "version": "1.0.0",
  "description": "",
# ..........
  "main": "server.js",
  # ..........
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
# ..........
    "dev": "nodemon server"
# ..........
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "date-fns": "^2.29.2",
    "uuid": "^8.3.2"
  }
}



# 1 import the common core modules 

# server.js .........
# ... 
const http = require('http')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 
# ....

const logEvents = require('./logEvents');
const EventEmitter = require('events')
class Emitter extends EventEmitter { }
const myEmitter = new Emitter()

# ...............


# 2 Define a port for the webserver 
    -It would normally be on address = localhost 
    -we need to define the PORT
# if we were to host this 
    const PORT = process.env.PORT 
# but we are using on local machine 
    const PORT = 3500

# so 
    const  PORT = process.env.PORT || 3500


# 3 ... CREATE  the minimal server  and listen for it 

const server = http.createServer((request, response) => {
    console.log(request.url , request.method)
}) 
server.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})


# when you type http://localhost:3500 on the browser , it outputs the http method on the terminal ,,,, (GET)

# on terminal 

Server running at port 3500
/ GET

# ................


# Can't serve a page for now 


# we could build a path an serve a file in the  server 

server.js 


const http = require('http')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 


const logEvents = require('./logEvents');
const EventEmitter = require('events')
class Emitter extends EventEmitter { }

const myEmitter = new Emitter()
const  PORT = process.env.PORT || 3500
const server = http.createServer((request, response) => {
    console.log(request.url , request.method)
# ...... this will cause the index.html page to be renderend if the set route is choosen ........
    let pathway

    if(request.url === '/' || request.url === 'index.html'){
        response.statusCode = 200 
        response.setHeader('Content-Type','text/html')

        pathway = path.join(__dirname,'views','index.html');

        fs.readFile(pathway,'utf8',(err,data) => {
            response.end(data)
        })
    }
# ..............
}) 
server.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})


