const UserDB = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

const HandleRefreshToken =  (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401)//UnAuthorized .... 

    const refreshToken = cookies.jwt
    

    const foundUser = UserDB.users.find((p)=>p.refreshToken === refreshToken) 
   if(!foundUser) return res.sendStatus(403) // forbidden .... 
  
    //evaluate refreshToken .... 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET ,
        (err, decoded) => {
            console.log("Hello" + decoded.username)
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403) //Forbidden    !== decoded.username
        
           
//    console.log(refreshToken)
//    console.log(foundUser.refreshToken)
            const accessToken = jwt.sign(
                {"username" : foundUser.username} ,
                process.env.ACCESS_TOKEN_SECRET , 
                {expiresIn: '30s'}
            );

            // send the access token 
            res.json({accessToken})
        
        }
    )


} 

module.exports = {HandleRefreshToken}





