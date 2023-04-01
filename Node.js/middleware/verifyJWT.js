const jwt = require('jsonwebtoken')
require('dotenv').config() 


const verifyJWT = (req,res,next) => {
        // authorization sometimes starts with small or capital letter ... 
        const authHeader = req.headers.authorization || req.headers.Authorization;
        // if the authHeader starts with Bearer
        if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)// Unauthorized 
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET ,
            (err, decoded) => {
                console.log(process.env.ACCESS_TOKEN_SECRET )
                if(err) return res.sendStatus(403) // forbidden // invalid token 
                // req.auth = token;
                // the username and roles are in the UserInfo ... set the roles too .. .
                req.user = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles;
                next()
            }
        )

    }   

module.exports = {verifyJWT}