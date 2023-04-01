
const express = require('express') 
const { getAllEmployees, postEmployee, deleteEmployee, putEmployee, getSingleEmployee } = require('../../controllers/employeeController')
const employeerouter = express.Router() 

const data = {}
data.employees = require("../../models/employees.json")


employeerouter.route("/") 
    .get(getAllEmployees)
    .post(postEmployee)
    .put(putEmployee)
    .delete(deleteEmployee)

employeerouter.route('/:id') 
    .get(getSingleEmployee)
   
// employeerouter.route('')


module.exports = {employeerouter}




