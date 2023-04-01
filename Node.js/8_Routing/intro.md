# We are going to create routes in node js

# in the server .js

    -We can breack the  routes out into individual routers
        -Many servers for each route

# 1 Creat a new director routes ...

# 2 Inside the routes directorty , create routers for each routes

subdir.js

    -Router is imported from express
    const router = express.Router()

# startder code ... for each route file

subdir.js

const express = require('express')  
const router = express.Router()
const path = require('path')

module.exports = router

# 3 Now pull the routes from the server.js and bring to this subdir.js

    -Instead of app.get ,,, we use router.get

# code .............

routes
subdir.js

        const express = require('express')

const router = express.Router()
const path = require('path')

# ............

router.get('^/$|/index(.html)?',(req,res) => {
res.sendFile(path.join(**dirname,"..","views","subdir", "index.html"))
})
router.get('/test(.html)?',(req,res) => {
res.sendFile(path.join(**dirname,"..","views","subdir", "test.html"))
})

# ............

module.exports = {router}

# ..................

# ... 4 In the server file , we need to import the route and provide it ... .we will use the "app.use"

    server.js ...

    app.use('/subdir',require('./routes/subdir'))

    1st parameter = http://localhost:3500/subdir/
    2nd parameter = imported the router which is appended to the first router

    Means any route coming throug  http://localhost:3500/subdir/

# ....

# ... NB .....ENABLING STATC FILES. we need to make the css to be available for the subdir ...

    app.use("/",express.static(path.join(__dirname,"public")))

    means apply css to the main directory

    app.use("/subdir",express.static(path.join(__dirname,"public")))

    means apply css to the sub director

# NB .... newer versions of express ,,, app.use = supports regex

# .. We will now create a route for the root directory ... and all the others

# so now we have two main routes

# ..server.js

// Serve static files
app.use("/",express.static(path.join(**dirname,"public")))
app.use("/subdir",express.static(path.join(**dirname,"public")))

# .//Routes..

app.use('/subdir', subdirrouter)
app.use('/', rootrouter)

# .....subdirrouter & rootrouter are being imported ...

# subdir.js

const express = require('express')
const subdirrouter = express.Router()
const path = require('path')

subdirrouter.get('^/$|/index(.html)?',(req,res) => {
res.sendFile(path.join(**dirname,"..","views","subdir", "index.html"))
})
subdirrouter.get('/test(.html)?',(req,res) => {
res.sendFile(path.join(**dirname,"..","views","subdir", "test.html"))
})

module.exports = subdirrouter

# root.js

const express = require('express')  
const rootrouter = express.Router()
const path = require('path')

rootrouter.get('^/$|/index(.html)?',(req,res) => {
res.sendFile(path.join(\_\_dirname,"..","views", "index.html"))
})

rootrouter.get('/new-page(.html)?',(req,res) => {
res.sendFile(path.join(\_\_dirname,"..","views", "new-page.html"))
})

rootrouter.get('/old-page(.html)?',(req,res) => {
res.redirect(301, '/new-page.html')
})

rootrouter.get("/home(.html)?" , (req, res , next) => {
next()
}, (req, res) => {
res.send("This is the Next Route Handler")
})

const one = (req,res, next) => {
console.log("One")
next()
}
const two = (req,res, next) => {
console.log("Two")
next()
}
const three = (req,res) => {
console.log("three")
res.send("This is three")
}

rootrouter.get("/number(.html)?", [one, two , three])

rootrouter.all("\*" ,(req, res) => {
res.status(404)
if(req.accepts(".html")){
res.sendFile(path.join(\_\_dirname,"views" , "404.html"))
}else if(req.accepts(".json")){
res.json({error: "404 Not found"})
}else {
res.type("txt").send("404 : Not found")
}

})

module.exports = rootrouter



# ..........end of inroduction ......









