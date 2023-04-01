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
        // We are going the apply JWT(Normal token and refresh token ) to use in the other routes we want protected in our api 
        res.json({'message': `User ${user} is logged in`})
    }else{
        res.sendStatus(401) // Unauthorized 
    }

} 

module.exports = {HanleLogin}