# controller/refreshTokenController.js 
#    -get cookies 
        const cookies = req.cookies
#    -check if cookies exist then check the jwt property that was set ... 
        if(!cookies?.jwt) res.status(401)
    
#    -find the particular refreshToken cookie in the database by a paticular user 
        const refreshToken = cookies.jwt
        const foundUser = UserDB.users.find((p)=>p.refreshToken === refreshToken) 

#    -check if user with that refresh token  exist
         if(!foundUser)res.sendStatus(403) // forbidden .... 

#    -evaluate the received refresh token ... same thing was done with access token .... 
         jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET ,
        (err, decoded) => {
#            //check if err exist or if foundUser.username ! 
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403) //Forbidden 
#            //create a new accessToken 
            const accessToken = jwt.sign(
                {'username' : decoded.username} ,
                process.env.ACCESS_TOKEN_SECRET , 
                {expiresIn: '30s'}
            )

#            // send the access token 
            res.json({accessToken})
        
        }
    )





# ... full code .... controller/refreshTokenController.js 
const UserDB = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}



const jwt = require('jsonwebtoken')
require('dotenv').config()



const HanleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) res.status(401)//UnAuthorized .... 

    const refreshToken = cookies.jwt
    const foundUser = UserDB.users.find((p)=>p.refreshToken === refreshToken) 
    if(!foundUser)res.sendStatus(403) // forbidden .... 

    //evaluate refreshToken .... 

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET ,
        (err, decoded) => {
            //check if err exist or if foundUser.username ! 
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403) //Forbidden 
            //create a new accessToken 
            const accessToken = jwt.sign(
                {'username' : decoded.username} ,
                process.env.ACCESS_TOKEN_SECRET , 
                {expiresIn: '30s'}
            )

            // send the access token 
            res.json({accessToken})
        
        }
    )
} 
module.exports = {HanleRefreshToken}
# .......................................


# now we are done the this part ... lets create the refreshToken route..


# NB ..
    sendStatus .... not status ... 
    status is chainable  if we are sending a response after that .... 
    





































