# create  auth controller ..



#     //check if the user has an account and logg him out if he does not 
    const foundUser = UserDB.users.find((p)=>p.username === user) 
    if(!foundUser)res.sendStatus(401) //UnAuthorized .... 


#     compare the password ... 
        bcrypt.compare()
            -parameters 
                -1st = received password 
                -2nd = password from database of that foundUser

    //Compare password 
    const match = await bcrypt.compare(pwd , foundUser.password)
    if(match){
        res.json({'message': `User ${user} is logged in`})
    }else{
        res.sendStatus(401) // Unauthorized 
    }

#          fullcode .......................................................................................................................................................................................................................................................................................................................................................................................................................................... 

# controllers/authContoller.js ..... 
const UserDB = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const path = require('path') 
const fsPromises = require('fs').promises 

const bcrypt = require('bcryptjs')


const HanleLogin = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})

    //check if the user has an account and logg him out if he does not 
    const foundUser = UserDB.users.find((p)=>p.username === user) 
    if(!foundUser)res.sendStatus(401) //UnAuthorized .... 

    //Compare password 
    const match = await bcrypt.compare(pwd , foundUser.password)
    if(match){
# .....create JWT........
        // We are going the apply JWT(Normal token and refresh token ) to use in the other routes we want protected in our api 
# .........................
        res.json({'message': `User ${user} is logged in`})
    }else{
        res.sendStatus(401) // Unauthorized 
    }

} 

module.exports = {HanleLogin}
# ...............................

#  routes/api/auth.js 

const express = require('express') 
const { HanleLogin } = require('../../controllers/authContoller')
const authrouter = express.Router() 



authrouter.route('/')
    .post(HanleLogin)
  

module.exports = {authrouter}

# ............

# server.js 
app.use('/login' ,authrouter)
# ...........


# ...................................................................................................
# ...................................................................................................
# ...................................................................................................
# ...................................................................................................


# http://localhost:3500/login ..... test on thunder client 

# works .... 



