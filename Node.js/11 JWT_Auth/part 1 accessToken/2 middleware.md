# create a new middleware 

# middleware/verifyJWT.js

    -define auth headers 
        const authHeaders = req.headers['authorization'];
    -check if auth headers is received 
        if(!authHeader) return res.sendStatus(401)// Unauthorized 
    
        console.log(authHeader)  // Bearer token 
    -on the console = Bearer token 

    -We can define the token now .... 
        ' ' = space between Bearer and token 
        [1] = token
        const token = authHeader.split(' ')[1]

    -Verity the token 
        -parameters 
            -token 
            -access token secret(that's what we will verify with this middleware)
            -callback 
                -parameters 
                    -err 
                    -decoded (it will have decoded info from jwt )
                -function 
                    -check for err 
                    -set req.user = decoded.username 
                    -next() 

# code ..... 

const jwt = require('jsonwebtoken')
require('dotenv').config() 


const verifyJWT = (req, res , next) => {
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.sendStatus(401)// Unauthorized 
        console.log(authHeader) // Bearer token
        const token = authHeader.split(' ')[1]

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET ,
            (err, decoded) => {
                if(err) return res.sendStatus(403) // forbidden // invalid token 
                req.user = decoded.username 
                next()
            }
        )

    }   

module.exports = {verifyJWT}

# ............


# with the middleware complete , we can head to routes that we want to protect ... 







