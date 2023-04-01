const jwt = require('jsonwebtoken')
const User = require('../models/User')

const HandleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)//UnAuthorized .... 

    const refreshToken = cookies.jwt
    


    const foundUser = await User.findOne({refreshToken : refreshToken}).exec()
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

            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                   "UserInfo" : {
                    "username" : foundUser.username ,
                    "roles" : roles
                   }    
                } , 
                process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '30s'}
            )
            // send the access token 
            res.json({accessToken})
        
        }
    )
} 

module.exports = {HandleRefreshToken}





