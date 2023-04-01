
const express = require('express') 
const { getAllEmployees, postEmployee, deleteEmployee, putEmployee, getSingleEmployee } = require('../../controllers/employeeController')
const { verifyJWT } = require('../../middleware/verifyJWT')
const employeerouter = express.Router() 



employeerouter.route("/") 
    .get(getAllEmployees)
    .post(postEmployee)
    .put(putEmployee)
    .delete(deleteEmployee)

employeerouter.route('/:id') 
    .get(getSingleEmployee)
   
// employeerouter.route('')


module.exports = {employeerouter}




