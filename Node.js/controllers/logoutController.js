const User = require("../models/User")


const HandleLogOut = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) // No content ... 
    const refreshToken = cookies.jwt 

    //To Clear cookie if refreshToken exist .... 

    const foundUser = await User.findOne({refreshToken : refreshToken}).exec()
   if(!foundUser) { 
   res.clearCookie('jwt' , {httpOnly : true});
   return res.sendStatus(204) // No content ... 
    }

    //To clear refresh token from logging out user in db .... 
    foundUser.refreshToken = '' 
    const result = await foundUser.save()
    console.log(result)

    // clear cookie ... 
     res.clearCookie('jwt', {httpOnly: true ,sameSite : "None" , 
      maxAge: 24 * 60 * 60 * 1000}) // secure = true ... during production ... this will make it only server on "https". 
//secure : true
     res.sendStatus(204) // No Content .... 
    }


    module.exports = { HandleLogOut}





