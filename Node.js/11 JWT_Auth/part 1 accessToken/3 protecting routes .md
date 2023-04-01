# we go to the employees.js route 

# import the new middleware  we created ..

# we now place them as the first parameter in our get,post etc routes .... 

# Place this in the routes you want that should be protected .... 


# routes/api/employees.js 
    -import jwtVerify
         const { verifyJWT } = require('../../middleware/verifyJWT')
    -include in the routes you wish to protect
        .get(verifyJWT,getAllEmployees)

# code ... 
    
const express = require('express') 
const { getAllEmployees, postEmployee, deleteEmployee, putEmployee, getSingleEmployee } = require('../../controllers/employeeController')
const { verifyJWT } = require('../../middleware/verifyJWT')
const employeerouter = express.Router() 

const data = {}
data.employees = require("../../models/employees.json")


employeerouter.route("/") 
# ........
    .get(verifyJWT,getAllEmployees)
# ........
    .post(postEmployee)
    .put(putEmployee)
    .delete(deleteEmployee)

employeerouter.route('/:id') 
    .get(getSingleEmployee)
   
employeerouter.route('')


module.exports = {employeerouter}

# ........





# Now test this on thunder client ... http://localhost:3500/login



# if not user... ... http://localhost:3500/register


# NB ... to access the get employees route .... you have to send the access token in the auth 

    req.Auth.Bearer = accessToken ... 

    but it expires after 30s and you can't use that token anymore .....



# To make all the routes to be protected ......  
    go to the server js 
    -import verityJWT 
    -place above the employee routes .... not above the root, auth , register .... 
    -it will apply to all the routes below it ...... it works like a waterfall 



# server.js 


app.use(verifyJWT)
app.use('/employees', employeerouter)


# ..................................

# works for  all the routes within the employees...









