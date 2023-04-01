
const express = require('express') 
const { ROLES_LIST } = require('../../config/roles_list')
const { getAllEmployees, postEmployee, deleteEmployee, putEmployee, getSingleEmployee } = require('../../controllers/employeeController')
const { verifyJWT } = require('../../middleware/verifyJWT')
const { verifyRoles } = require('../../middleware/verifyRoles')
const employeerouter = express.Router() 



employeerouter.route("/") 
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),postEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),putEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

employeerouter.route('/:id') 
    .get(getSingleEmployee)
   
// employeerouter.route('')


module.exports = {employeerouter}




