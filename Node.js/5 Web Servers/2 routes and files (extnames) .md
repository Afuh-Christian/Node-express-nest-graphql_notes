# let's check the extensions of the urls we get 

 const extentions = path.extname(request.url)

 # .......let's set the content type according to the file extentions 


    let contentType 

    switch (extensions) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }

 # .............



 # Let's use changed ternary to set the filepath

      let filepath = 
        contentType === 'text/html' && request.url === '/'
            ? path.join(__dirname,'views','index.html') 
            : contentType === 'text/html' && request.url.slice(-1) === '/'
                ? path.join(__dirname,'views',request.url,'index.html')     // request.url = subdir ... like leaving from main page to item detail
                : contentType === 'text/html'
                    ? path.join(__dirname,'views',request.url)
                    : path.join(__dirname,request.url)


    if(!extensions && request.url.slice(-1) !== '/') filepath += ".html"

 # ...................



# .....full code ..............


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

    const extensions = path.extname(request.url)

    let contentType 

    switch (extensions) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }


    let filepath = 
        contentType === 'text/html' && request.url === '/'
            ? path.join(__dirname,'views','index.html') 
            : contentType === 'text/html' && request.url.slice(-1) === '/'
                ? path.join(__dirname,'views',request.url,'index.html')     // request.url = subdir ... like leaving from main page to item detail
                : contentType === 'text/html'
                    ? path.join(__dirname,'views',request.url)
                    : path.join(__dirname,request.url)

    //makes .html extension not required in the browser 
    if(!extensions && request.url.slice(-1) !== '/') filepath += ".html"

}) 
server.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})


# ..........................



# Now let's check if we want to serve the file ..

  const fileExists = fs.existsSync(filepath) 

    if(fileExists) {
        // serve the file 
    }else {
        //404
        // 301 redirect

        console.log(path.parse(filepath))
    }



# path.parse(filepath) gives an object containing properties of the filepath 

e.g 

http://localhost:3500/old

this end point gives the below because it does not exist 

{
  root: 'E:\\',
  dir: 'E:\\Saved Files\\Courses\\Web Development  React & Django & Node.js\\Backend webdev\\Javascript\\Node & Express js\\notes\\01TUT\\views',
  base: 'old.html',
  ext: '.html',
  name: 'old'
}

# Now that we know how to get the filepath object and the base property , we can set special conditions that can route us to a particular page if the filepath does not exist 

  if(!extensions && request.url.slice(-1) !== '/') filepath += ".html"

    const fileExists = fs.existsSync(filepath) 

    if(fileExists) {
        // serve the file 
    }else {
        //404
        // 301 redirect

        switch(path.parse(filepath).base){
            case 'old-page.html' : 
                response.writeHead(301, {'Location' : '/new-page.html'});
                response.end();
                break;
            case 'www-page.html' : 
                response.writeHead(301, {'Location' : '/new-page.html'});
                response.end();
                break;
                default : 
                    // serve a 404 response 
         }




# we can do this better by creating an asyn function out of the server and calling it in all those conditions 




const http = require('http')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 


const logEvents = require('./logEvents');
const EventEmitter = require('events')
class Emitter extends EventEmitter {}

const myEmitter = new Emitter()

# ....................
const serveFile = async (filePath ,contenType, response) => {

    try{
        const data = await fsPromises.readFile(filePath,'utf8');
        response.writeHead(200, {'Content-Type': contenType});
        response.end(data);
    }catch(err){
        console.log(err) 
        response.statusCode = 500;
        response.end();
    }

}

# ......................

const  PORT = process.env.PORT || 3500
const server = http.createServer((request, response) => {
    console.log(request.url , request.method)

    const extensions = path.extname(request.url)

    let contentType 

    switch (extensions) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }


    let filepath = 
        contentType === 'text/html' && request.url === '/'
            ? path.join(__dirname,'views','index.html') 
            : contentType === 'text/html' && request.url.slice(-1) === '/'
                ? path.join(__dirname,'views',request.url,'index.html')     // request.url = subdir ... like leaving from main page to item detail
                : contentType === 'text/html'
                    ? path.join(__dirname,'views',request.url)
                    : path.join(__dirname,request.url)

    if(!extensions && request.url.slice(-1) !== '/') filepath += ".html"

# ......................
    const fileExists = fs.existsSync(filepath) 

    if(fileExists) {
        // serve the file 
        serveFile(filepath,contentType,response )
    }else {
        //404
        // 301 redirect
        switch(path.parse(filepath).base){
            case 'old-page.html' : 
                response.writeHead(301, {'Location' : '/new-page.html'});
                response.end();
                break;
            case 'www-page.html' : 
                response.writeHead(301, {'Location' : '/new-page.html'});
                response.end();
                break;
                default : 
                    // serve a 404 response 
                    serveFile(path.join(__dirname,'views','404.html'),'text/html',response )

         }
# ......................
        console.log(path.parse(filepath))
    }



}) 
server.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})



# let's modify the serveFile function to be able to stringigy json data 


//# ....................
const serveFile = async (filePath ,contenType, response) => {

    try{
        const rawData = await fsPromises.readFile(filePath,'utf8');
# ..........
        const data = contenType === 'application/json'
            ? JSON.parse(rawData) : rawData;
# ..........
        response.writeHead(200, {'Content-Type': contenType});
# ..........
        response.end(
            contenType === 'application/json' 
                ? JSON.stringify(data) : data 
        );
# ..........
    }catch(err){
        console.log(err) 
        response.statusCode = 500;
        response.end();
    }

}

//# ......................


# now http://localhost:3000/data/data.json 
    - will output a string representation of the data present 

    [{"firstname":"Dave","lastname":"Gray"},{"firstname":"John","lastname":"Smith"}]


# ...............................................







#  let's make it posible for the image to be loaded ... 
# image does not use utf8 .. it uses nothing ... 
# We will still configure the serveFile function 
     contentType.include('image') ? '' : 'utf8'


# .......
# ....................
const serveFile = async (filePath ,contenType, response) => {

    try{
        const rawData = await fsPromises.readFile(filePath,
# .......# .......
            !contenType.includes('image') ? 'utf8' : '' );
# .......# .......
        const data = contenType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(200, {'Content-Type': contenType});
        response.end(
            contenType === 'application/json' 
                ? JSON.stringify(data) : data 
        );
    }catch(err){
        console.log(err) 
        response.statusCode = 500;
        response.end();
    }

}

# http://localhost:3500/img/img1.jpg

# ......................
# .......


# We also have to adjust the response status type .. in the serveFile function 


# ...............
const serveFile = async (filePath ,contenType, response) => {

    try{
        const rawData = await fsPromises.readFile(filePath,
            contenType.includes('image') ? '' : 'utf8');
        const data = contenType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
# ...............# ...............
            filePath.includes('404.html')? 404 : 200
# ...............# ...............
            , {'Content-Type': contenType});
        response.end(
            contenType === 'application/json' 
                ? JSON.stringify(data) : data 
        );
    }catch(err){
        console.log(err) 
        response.statusCode = 500;
        response.end();
    }

}

# http://localhost:3500/odafda
# ...............