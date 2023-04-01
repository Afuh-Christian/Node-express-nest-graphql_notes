const UserDB = {
    users : require("../models/users.json"),
    setUsers : (data) => this.users = data 
}




const path = require('path') 
const fsPromises = require('fs').promises 

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
require('dotenv').config()


const HanleLogin = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})

    //check if the user has an account and logg him out if he does not 
    const foundUser = UserDB.users.find((p)=>p.username === user) 
    if(!foundUser)res.sendStatus(401) //UnAuthorized .... 


    const match = await bcrypt.compare(pwd , foundUser.password)
    if(match){
        // We are going the apply JWT(Normal token and refresh token ) to use in the other routes we want protected in our api 
      
        //define accesstoken 
        const accessToken = jwt.sign(
            {"username":foundUser.username} , 
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
       
        const otherUsers = UserDB.users.filter((p) => p.username !== foundUser.username)
       const currentUser = {...foundUser , refreshToken}
       otherUsers.push(currentUser)

        // write to json file ... 
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json')
            , JSON.stringify(otherUsers)
            )
        // ..............

        // save to cookie and send to user ... ... 
            res.cookie('jwt', refreshToken , {
                httpOnly: true , 
                maxAge: 24 * 60 * 60 * 1000 
            })

            

            res.json({accessToken})

    }else{
        res.sendStatus(401) // Unauthorized 
    }

} 

module.exports = {HanleLogin}