# ..6 routes/api/employee.js    
    -import 
        -ROLE_LIST 
        -verityRoles(pass in the ROLE_LIST attributes that needs to be possesed by a user to access a specific route ...)
                -in here we can access it like this .... ROLE_LIST.Admin   etc ... 
                -ROLE_LIST.User was already made the defualt ... at the point when the user logged in ... 


    

# .....CODE ....

employeerouter.route("/") 
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),postEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),putEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)


- Everyone can access the get 
- Only admin can access all 
- editor can access just post and put .. 

# ..........


# full code .... 



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


# ..............



# ... now test this on thunder client ... 
          
    

# ... NB ..when testing refreshToken with thunder client ... remove the secure = true.... for now ..... 
    -Else nothing will be stored in the cookie ....  .

    -but if you are using chrome to test .. use secure = true ..