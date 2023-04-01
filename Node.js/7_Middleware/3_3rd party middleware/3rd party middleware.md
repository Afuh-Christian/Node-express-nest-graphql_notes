# ...examples

# CORS

    npm i cors

# server.js

# import cors

    const cors = require('cors')

# We apply the middleware.... we do this after the logger

    app.use(cors())

# on the web browser ...

    -go the console  ,,,, fetch('http://localhost:3500/')

# we don't get a cors error anymore

# open any website eg ... https://www.google.com

# now in the request logger .. we will see www.google as the name of the website that made the request ....

    -from ... req.headers.origin = name of website

# ....................let's restric websites that can access this backend ..............

# create a list of the endpoints that can access this api

const whiteList = ['https://www.google.com','http://localhost:3000']

# create the function that will allow cors to do this

    -corsOptions object...
        -origin:(origin,callback)=>{} ... can accept a function
            -parameter
                origin = website requesting the api

            -function(){
                check if the origin is in the whiteList
                callback(null, true)
                    - parameters of the callback
                        -1st = Error ...and is set to null if the origin exist in the whiteList
                        -2nd = Permission ... is set to true if the orgin exist in the whiteList
            }

        -set the success status to 200

    -pass the corsOptions as an argument to the cors()

# code .....

const whiteList = ['http://localhost/3000']
const corsOptions = {
origin : (origin,callback) => {
if(whiteList.indexOf(origin) !== -1 ){ //during developement use ....if(whiteList.indexOf(origin) !==-1||!origin )  
 callback(null, true)
}else{
callback(new Error("Not allowed by CORS"))
}
},
optionsSuccessStatus:200
}
app.use(cors(corsOptions))

# .........

# https://www.google.com/ ... now goole can't access this site

# fetch("http://localhost:3500/") .... on the console of the browser when you on any website

# So when we have an error ,,,, when a site can't access this backend ... express already handles this error

# We can create a custom error

    -this will be at the bottom of the page ...
    -Parameters ,
        -err
        -req
        -res
        -next

# code ....

app.use((err,req,res,next) => {
console.error(err.stack)
res.status(500).send(err.message)
})

# .....set a status code of 500 and send error message to the browser...

# during production add !origin as one of the coditions ... because accessing the http://localhost will give the err.message

# let's make the above case cleaner ...

    -make new file called errorHandler and export
    -import and  call in the app.use() at the bottom of the page ....

# we need to log this error ...

    so in the errorHandler.js import the logEvents
    -call it in the errorHandler functions and pass in the two parameters need
        -message  in this case .... err.message
        -file     ....reqLog.txt

# ... .use .all .get

1 app.use('/') == app.all("*") == app.get("/*")

2 .use does not accept regexes

3 app.all("*") === app.get("/*")

# ... we can also check for types .... req.accepts('.html')

# code ....

app.all("/*" ,(req, res) => {
res.status(404)

# .......

        if(req.accepts(".html")){
            res.sendFile(path.join(__dirname,"views" , "404.html"))
        }

# .......

})

# .......

# full code ..

app.all("\*" ,(req, res) => {
res.status(404)
if(req.accepts(".html")){
res.sendFile(path.join(\_\_dirname,"views" , "404.html"))
}else if(req.accepts(".json")){
res.json({error: "404 Not found"})
}else {
res.type("txt").send("404 : Not found")
}

})

# ...................
