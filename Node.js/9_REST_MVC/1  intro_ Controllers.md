# we will organize everything more better in an MVC pattern ... 

# create a new folder called the 
#    -model       ..... simulates the databases 
        (all the data should be in here ) 
        -employees.json

        NB ... we are simulating a connection to a data base ... for now we are not connected to a real database , but employees.json is acting like one 

#     -views        
        -we are not serving static pages in this case 


#      -controllers    ..... home of all the logic
            -employeeController.js


            NB we current have all the logic in the routes but all that logic should be in a separate file called the contoller 

            in the routes , the parameters of the http request are anonymous functions which are the logics for those http methods .... we are going to move all those functions and assign them values in the controllers and then import them from there into the routes and pass them as parameters into those http methods 



# MVC ....example 

# Controllers ... employeeController.js 

const data = {} 
data.employees = require("../models/employees.json")
// console.log(data.employees)


const getAllEmployees = (req,res) => {
    res.json(data.employees)
}

module.exports = {
    getAllEmployees
}

# Route   .... routes/api/employees.js


const express = require('express') 
const { getAllEmployees } = require('../../controllers/employeeController')
const employeerouter = express.Router() 

employeerouter.route("/") 
    .get(getAllEmployees)



# ... # ..................# ..................we are going to apply this on the other http methods ..... figure it out # ..................# ..................# ..................# ..................

# employeeController.js

const data = {} 
data.employees = require("../models/employees.json")
// console.log(data.employees)

// httpGET
const getAllEmployees = (req,res) => {
    res.json(data.employees)
}

//httpPOST
const postEmployee = (req,res) => {
    res.json({ 
        "firstname":req.body.firstname,
        "lastname":req.body.lastname 
    })
}

//httpPUT 
const putEmployee = (req,res) => {
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname 
    })
}

//httpDELETE 
const deleteEmployee = (req,res) => {
    res.json({
       "id": req.body.id
    })
}



//httpGET_id 

const getSingleEmployee = (req, res) => {
    res.json({
        "id" : req.params.id
    })
}

module.exports = {
    getAllEmployees,
    postEmployee,
    deleteEmployee,
    putEmployee,
    getSingleEmployee
}
# ..................


# routes/api/employees.js 

const express = require('express') 
const { getAllEmployees, postEmployee, deleteEmployee, putEmployee } = require('../../controllers/employeeController')
const employeerouter = express.Router() 

const data = {}
data.employees = require("../../models/employees.json")


employeerouter.route("/") 
    .get(getAllEmployees)
    .post(postEmployee)
    .put(putEmployee)
    .delete(deleteEmployee)

employeerouter.route('/:id') 
    .get()
   


module.exports = {employeerouter}


# ..................


