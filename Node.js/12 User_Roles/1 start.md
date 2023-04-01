# 1 ...create new file in the config ... 

# config/roles_list.js 
    -create the user roles here 
    -could be  in a  data table in a database  
    -the user permissions can be constructed in an assortment of way .. 

    -create an object for the roles 
        -keys are the names of the roles .. 
        -a code for those roles .... 


  # code .... 
            const ROLES_LIST = {
    "Admin" : 5150 , 
    "Editor" :  1984 , 
    "User" : 2001
}

module.exports = {ROLES_LIST}
   # .........

# ...2 Modify the user.json .... 

[
    {
        "username":"A1",
        "roles" : {
            "User" : 2001,
            "Editor" : 1984 ,
            "Admin" : 5150   
        }
,"password":"$2a$10$UZv7rhbSLrADxPeFIhSXL.myjeG7jneP5V2VOwdnZomLIWpv3I/g2"
,"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkExIiwiaWF0IjoxNjYzNzQ3NDk4LCJleHAiOjE2NjM4MzM4OTh9.AyxBbcl8in-wnEzDA03JDs1AT_zkCNtWHIJ_ozY52pc"
},
{
    "username":"A2",
    "roles" : {
        "User" : 2001,
        "Editor" : 1984 
        
    },
    "password":"$2a$10$5JAUGCBU1w8BpE8Ntqe9DeUBm2NR1/v3enh1zJPzWfpq3D9PV2wBS",
    "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkEyIiwiaWF0IjoxNjYzNzQ3NTE2LCJleHAiOjE2NjM4MzM5MTZ9.z1IoYPsQkkskMjN8pKa43vtw2DJVf-jHCXPAhtSiR4k"
    },{
        "username":"A3",
        "roles" : {
            "User" : 2001
              
        },
        "password":"$2a$10$rEoZMMGfD5b.lsv/dLXukeakrD6kGf5kBl0D.RUohsQ/2na3vc8Em",
        "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkEzIiwiaWF0IjoxNjYzNzQ3NTIwLCJleHAiOjE2NjM4MzM5MjB9.yw_Znvsa6quGs4QAFbGw5d1CI07ZvnP0jIJLfiRTIt0"}]

# we have assigned roles to the following users ..... 

    -we will ensure that when everyone register they are given the " User " role ... 
    -the "Amin" who is in charge can now add the additional roles to those users ..... 


# 2 .... in the Register user .... and the roles object in it too .... default role will be  {"User" :2001 }

# controllers/registerController.js

 #  code ....
    const UserDB = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const path = require('path') 
const fsPromises = require('fs').promises 

const bcrypt = require('bcryptjs')

// Handler of the register route 
const HandleNewUser = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})

    //Check for duplicates 
const duplicate = UserDB.users.find((p)=>p.username === user) 
if(duplicate)res.sendStatus(409) //conflict

    try{

        //encrypt password 
        const HashedPwd = await bcrypt.hash(pwd , 10)
        // store the new user 
#  ..................
        const newUser = {
            'username': user , 
            'roles' : {
                "User":2001
            },
            'password':HashedPwd
        }
# ..................
        UserDB.setUsers(UserDB.users.push(newUser))
       
        console.log(UserDB.users)
        console.log(newUser)
        console.log("Hello")
        //store in the UserDBbase (json file) 
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json')
            , JSON.stringify(UserDB.users)
            );
        // console.log(UserDB.users)
        res.status(201).json({'success': `New user ${user} created`})

    }catch(err) {
    res.status(500).json({ 'message': err.message})
}
}

module.exports = {HandleNewUser}

 # ......... 

 # 4 ... let's send the roles with the username when an access token get's generated ... 

 # controllers/authController.js

# example ... 
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

    -UserInfo is a different namespace ... this is better because it's considered to be a  private jwt claim .
    -there are some reserve keywords for public jwt claims ...  https://www.jwt.io/
    -Object.values(obj) returns the values  of the attributes of the obj in a list ... 

    there's no need to store the roles with the refresh token 
    -the roles will be stored in memory on the frontend ... 

    when we send the roles ... we are just sending the code ... [2001] ..so we are hidding what each one is by using codes 


# controllers/authController.js 
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
# ..........
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
# ..........
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
                maxAge: 24 * 60 * 60 * 1000 ,
                sameSite : "None" , 
                secure : true
            })

            

            res.json({accessToken})

    }else{
        res.sendStatus(401) // Unauthorized 
    }

} 

module.exports = {HanleLogin}
# ................

# controllers/refreshTokenController.js 
const UserDB = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

const HandleRefreshToken =  (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)//UnAuthorized .... 

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
# ..................................
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
# ..................................
} 

module.exports = {HandleRefreshToken}


# ..............



# 5 ...... we  are going to have to create a new middleware to verify those roles ...... 

# but first alter some things in the middleware/verifyJWT.js

const jwt = require('jsonwebtoken')
require('dotenv').config() 


const verifyJWT = (req,res,next) => {
#        // authorization sometimes starts with small or capital letter ... 
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
#                // the username and roles are in the UserInfo ... set the roles too .. .
                req.user = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles;
                next()
            }
        )

    }   

module.exports = {verifyJWT}


# ....middleware/verifyRoles.js


// ...allowRoles  = the spread operator makes it posible to take any amount of parameters .... 
// we need to return  an anonymous middleware function inside which takes req,res,next .. 
// .. 

const verifyRoles = (...allowedRoles) => {
    return (req,res,next) =>{
        if(!req?.roles) return res.sendStatus(401) // Unauthorized .. 
        const rolesArray  = [...allowedRoles]
   #     // to have an array returning booleans ... 
  #      // in that array of booleans find the onces with true and return them ... 
        const result = req.roles.map((r) => rolesArray.inclues(r)).find((v) => v === true )
 #       // if none is true .... 
        if(!result) return res.sendStatus(401) //Unauthorized ..  
       
        next()

    }
}


module.exports = {verifyRoles}




