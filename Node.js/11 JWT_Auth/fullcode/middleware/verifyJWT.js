const jwt = require('jsonwebtoken')
require('dotenv').config() 


const verifyJWT = (req,res,next) => {
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.sendStatus(401)// Unauthorized 
        // console.log(authHeader) // Bearer token
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET ,
            (err, decoded) => {
                console.log(process.env.ACCESS_TOKEN_SECRET )
                if(err) return res.sendStatus(403) // forbidden // invalid token 
                console.log(decoded.username)
                req.user = decoded.username;
                req.auth = token;
                next()
            }
        )

    }   

module.exports = {verifyJWT}