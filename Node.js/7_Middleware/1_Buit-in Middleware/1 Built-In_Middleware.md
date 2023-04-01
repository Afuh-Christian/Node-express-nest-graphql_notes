#  Built-in  Middleware 
# .. code  eg ... this is placed above so that it's supplied to all routes coming in 
app.use(express.urlencoded({extended: false}))
# ......

# 1 app.use 
    - .use ... when applying  middleware to all routes coming in 
    - app.use should be placed above the routes ... so as to apply to all routes 

# What's it for 
    -For handling url encoded data ( e.g form-data)
    -So when this comes in the url , we can pull the data out as a parameter 

    -We need to set the middleware in order to get the data when a form is submitted 

# built-in middleware for form-data
    -to get the form-data that was submitted 

    app.use(express.urlencoded({extended: false}))

# built-in middleware for json
    -To be able to get the json data that was submitted 

    app.use(express.json())

# built-in middleware for Serving static files  .....  "public"  ... A folder where all the static files will be in ... create this folder manualy
app.use(express.static(path.join(__dirname,"public")))





# http://localhost:3500/ ..... when you click ... it now applies the css 

# http://localhost:3500/css/style.css  .... do this to check if the css file is in the public folder 






