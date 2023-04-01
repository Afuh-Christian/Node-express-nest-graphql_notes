const http = require('http')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 


const logEvents = require('./logEvents');
const EventEmitter = require('events')
class Emitter extends EventEmitter {}

const myEmitter = new Emitter()

myEmitter.on('log',(msg,fileName) => logEvents(msg,fileName)); /// logging 

const  PORT = process.env.PORT || 3500
//# ....................
const serveFile = async (filePath ,contenType, response) => {

    try{
        const rawData = await fsPromises.readFile(filePath,
            !contenType.includes('image') ? 'utf8' : '');
        const data = contenType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html')? 404 : 200
            , {'Content-Type': contenType});
        response.end(
            contenType === 'application/json' 
                ? JSON.stringify(data) : data 
        );
    }catch(err){
        console.log(err) 
        myEmitter.emit('log',`${err.name}\t${err.message}`,'errlog.txt'); // logging 
        response.statusCode = 500;
        response.end();
    }

}

//# ......................


const server = http.createServer((request, response) => {
    console.log(request.url , request.method)
    myEmitter.emit('log',`${request.url}\t${request.method}`,'reqlog.txt'); // loging

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

        console.log(path.parse(filepath))
    }
}) 
server.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})

    