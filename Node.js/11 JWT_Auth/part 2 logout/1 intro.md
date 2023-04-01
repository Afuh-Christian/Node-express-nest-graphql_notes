# We create a controller for the logout .. 
 - delete refresh and access tokens .... 


# NB .. add secure : true during production when sending or clearing cookies .... ... 

 # .... controller/ logoutController.js
    
    const UserDB = {
    users : require("../models/users.json"),
    setUsers : function  (data) { this.users = data } 
}

const fsPromises = require('fs').promises

const HandleLogOut = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) // No content ... 
    const refreshToken = cookies.jwt 

    //To Clear cookie if refreshToken exist .... 
    const foundUser = UserDB.users.find((p)=>p.refreshToken === refreshToken) 
   if(!foundUser) { 
   res.clearCookie('jwt' , {httpOnly : true});
   return res.sendStatus(204) // No content ... 
    }

    //To clear refresh token from logging out user in db .... 
    const otherUsers = UserDB.filter((p) => p.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser , refreshToken : ''}
    UserDB.setUsers([...otherUsers, currentUser])

    // Update the database .. 
    await fsPromises.writeFile(
        path.join(__dirname, '..' , 'models', 'users.json'), 
        JSON.stringify(UserDB.users)) 

    // clear cookie ... 
     res.clearCookie('jwt', {httpOnly: true , maxAge: 24 * 60 * 60 * 1000}) // secure = true ... during production ... this will make it only server on "https". 

     res.sendStatus(204) // No Content .... 
    }


    module.exports = { HandleLogOut}



# routes/logout.js 

const express = require('express') 
const { HandleLogOut } = require('../../controllers/logoutController')
const logoutRouter = express.Router() 



logoutRouter.route('/')
    .get(HandleLogOut)
   

module.exports = {logoutRouter}


# ...server.js .... 



