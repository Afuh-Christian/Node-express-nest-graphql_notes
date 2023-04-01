# In the app.get(route, route_hanlers)
    eg = app.get("/" , (req, res) => {}))


# the second parameter which is the ananymos function is the route handler
    
# -We can chain them or use more than one of them 
    eg
     app.get("/home(.html)?" , (req, res , next) => {
        next()
    }, (req, res) => {
        res.send("This is the Next Route Handler")
    })

# normally    app.get("/home.html" , (req,res,next) => {} , (req, res) => {} )

# callind the next() within the first handler  calls the next hanlder


http://localhost:3500/home .... 

# the next() goes to the next expression(next route handler)






# ............METHOD 2 of Route handlers 
    -define the functions independently 
    -the first should have as parameter 
        -next 
    - create a list and call them inside the list 
    - place this list in the position of the route handler  

# functions 

    const one = (req,res, next) => {
        console.log("One") 
        next() 
    }
    const two = (req,res, next) => {
        console.log("One") 
        next() 
    }
    const three = (req,res) => {
        console.log("three") 
        res.send("This is three")
    }


# list ..

    const routeHandlers = [one, two , three]

# in the route function 

    app.get("/number(.html)?, routeHandlers)










# ... ther route handlers would work in a way to what we call middleware

# ... next() ... calls the middleware

# we will make it chain of the 404 as well 

    -for now we are just making a custom 404 page ..... 



# we will also learn how to supple static givables like .. 
    -css 
    -javascript 
    -img







