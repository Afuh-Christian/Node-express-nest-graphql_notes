#  Adding user authentication to the express api ... 

# install the following packages ... 
    
    npm install bcryptjs




# 1 we are going to simulate a database table in the model directory with a user.json file 

# ............ models/users.json

[]

# 
# - users authorization requires 2 routes 
    -regitration route ... to register the user 
    -authorization route ... to authorise the user after they have created the account 

# 2 create a controller  to handle these routes .... 

# ......................controllers/registerController.js


# import the bcrypt , data (user data)

const data = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const bcrypt = require('bcryptjs')


# define the handler for the register  route 


const HandleNewUser = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})
}

# check for duplicate users in the database  ... 409 = conflict 
# still within the handler 

const duplicate = data.users.find((p)=>p.username === user) 
if(duplicate)res.status(409).json({'message': `Username ${user} already exist`})

# try catch blog 
# Encrypt the password ...... the bcrypt will be awaited

    bcrypt.hash()
        -parameters 
            -password recieved 
            -salt round (
                it hashes the password and adds a salt to it 
                -this protext the password if the database is somehow compromised 
            )


# code ... 
  //encrypt password 
        const HashedPwd = await bcrypt.hash(pwd , 10)
# .......

# Store the new user ... still in the try catch ...
-the username $ HashedPwd

// store the new user 
        const newUser = {'username': user , 'password':HashedPwd}
         UserDB.setUsers(UserDB.users.push(newUser))

# Write to our json file that we use as our database  .....  still in the try catch ...

    //store in the database (json file) 
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json')
            , JSON.stringify(data.users)
            );
        console.log(data.users)
        res.status(201).json({'success': `New user ${user} created`})

# now export the Handler .... 

module.exports = {HandleNewUser}



# Routes .... import the handler in the routes.. create a new route .. 
# routes/api/register.js 


const { HandleNewUser } = require('../../controllers/registerController')
const registerrouter = express.Router() 


registerrouter.post('/', HandleNewUser)

module.exports = {registerrouter}

# Now import in the server.js  ... 

# ................. full code .... .......................................................................................................................

# controllers/registerController.js
const data = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const path = require('path') 
const fsPromises = require('fs').promises 

const bcrypt = require('bcryptjs')
const { Hash } = require("crypto")

// Handler of the register route 
const HandleNewUser = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})

    //Check for duplicates 
const duplicate = data.users.find((p)=>p.username === user) 
if(duplicate)res.status(409).json({'message': `Username ${user} already exist`})


    try{

        //encrypt password 
        const HashedPwd = await bcrypt.hash(pwd , 10)
        // store the new user 
        const newUser = {'username': user , 'password':HashedPwd}
         UserDB.setUsers(UserDB.users.push(newUser))

        //store in the database (json file) 
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json')
            , JSON.stringify(data.users)
            );
        console.log(data.users)
        res.status(201).json({'success': `New user ${user} created`})



    }catch(err) {
    res.status(500).json({ 'message': err.message})
}
}

module.exports = {HandleNewUser}

# .......................................

# routes/register.js
const express = require('express') 
const { HandleNewUser } = require('../../controllers/registerController')
const registerrouter = express.Router() 



registerrouter.post('/', HandleNewUser)
  

module.exports = {registerrouter}
# .......................................

# server.js    



const express = require('express') 
const app = express()
const path = require('path')
const { ppid } = require('process')
const { logger } = require('./middleware/logEvents')
const  PORT = process.env.PORT || 3500
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const rootrouter = require('./routes/root')
const { employeerouter } = require('./routes/api/employees')
const { parseArgs } = require('util')
const { corsOptions } = require('./config/corsOptions')
const { registerrouter } = require('./routes/api/register')



//custom middleware logger
app.use(logger)

// cors 
app.use(cors(corsOptions))

// Built-in Middleware for form-data
app.use(express.urlencoded({extended: false}))

// Built-in Middleware for json
app.use(express.json())

// Serve static files 
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/employees",express.static(path.join(__dirname,"public")))

//Routes.. 
app.use('/employees', employeerouter)
app.use('/register', registerrouter)
app.use('/', rootrouter)

// api route 


// sample route 


// Errors .... 
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server running at port ${PORT}`)
})

# ...............................

# ..................................................................................................................................................................

 now run the server and test on Thunder Client .... 

# http://localhost:3500/register



... Now we need to handle the authorization 
 