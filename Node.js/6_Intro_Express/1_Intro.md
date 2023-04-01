# Doc   https://expressjs.com 

# Add express to project 
    npm i express --save

# 1...............Server.js .............

# import express 
    const express = require('express') 
# define app 
    const app = express()
# listen for the app 
    app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})

# specify our first route ... http method ... 

# GET parameters 
    -route 
    -() => {} .. whatever happens in that route 

app.get('/',(request,response) => {
    response.send("Hello World")
})

#  full code .......



const express = require('express') 
const app = express()

const http = require('http')
const  PORT = process.env.PORT || 3500


app.get('/',(request,response) => {
    response.send("Hello World")
})

app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
}) 

# ('/')  = index page 
# npm run dev  on terminal
# http://localhost:3500/  
    Displays "Hello world" on browser" 
# ............

# we can also sendFile 
    response.sendFile(path.join(__dirname,"views", "index.html"))
#   OR 
     response.sendFile("./views/index.html",{root: __dirname})

# code ...... 

app.get('/',(request,response) => {
    response.sendFile(path.join(__dirname,"views", "index.html"))
})


#   .....

# we could add some regex to the routes (to add conditions in the routes )
    ^/ = must begin with / 
    /$ = must end with / 
    | = or 

app.get('^/$|/index.html|/index',(request,response) => {
    response.sendFile(path.join(__dirname,"views", "index.html"))
})

# we can add other routes and their pages like 

# code ..... 

#  ..........

# NB ... express already set the 
    -statuCode 
    -Content-Type


#  Redirect   .... 302 by default 
    takes two parameters 
        -status code  (301 usually for redirect (permanently redirected ))
        -route d
# code .
app.get('/old(.html)?',(request,response) => {
    response.redirect(301, "/new-page")
})

# http://localhost:3500/old  ...permanently redirects to  http://localhost:3500/new-page with filepath = (path.join(__dirname,"views", "new-page.html")
# .....NB /new-page is a route name and not a filename 


# .......



# To create  a default route .... usually used for wrong route entry or routes that do not exist like in react 
# ("/*") 
# status(404) ... we need to set the status code for all non-existing routes ... 


app.get("/*" ,(request, response) => {
    response.status(404).sendFile(path.join(__dirname,"views" , "404.html"))
})













