const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User")



const HanleLogin = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})

    //check if the user has an account and logg him out if he does not 
    const foundUser = await User.findOne({username : user}).exec()
    console.log(foundUser)
    if(!foundUser) return res.sendStatus(401) //UnAuthorized .... 
 

    const match = await bcrypt.compare(pwd , foundUser.password)
    if(match){
        // We are going the apply JWT(Normal token and refresh token ) to use in the other routes we want protected in our api 
      
        const roles = Object.values(foundUser.roles)
        //define accesstoken 
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
        //define refreshtoken 
        const refreshToken = jwt.sign(
            {"username":foundUser.username} , 
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: '1d'}
        )

        // .... .. Saving the refresh token ..... 
         foundUser.refreshToken = refreshToken 
         const result = await foundUser.save()
        // ..............

        // save to cookie and send to user ... ... 
            res.cookie('jwt', refreshToken , {
                httpOnly: true , 
                maxAge: 24 * 60 * 60 * 1000 ,
                sameSite : "None" , 
                // secure : true ..... does not work wth thunder client .... 
            })

            

            res.json({accessToken})

    }else{
        res.sendStatus(401) // Unauthorized 
    }

} 

module.exports = {HanleLogin}