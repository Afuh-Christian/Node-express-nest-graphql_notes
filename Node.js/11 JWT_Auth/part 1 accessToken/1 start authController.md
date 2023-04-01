# Create a new file ....

# .env

    -we will put the environment variables in here

# . env

    ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

# Terminal ... do this to get a random access token ..

    node
    >require('crypto').randomBytes(64).toString('hex')

# node has a common core module called crypto

    -the above command tells node to give us a random byte string that we can use as an access token ..
    -copy the access token it produces and use ...

    eg
    280abfdc938571d2d918497c67205f37eb3a8edc4d0053209e18a4d0c27ea5caa4f25e566a53fa89d88d3e462d5adf94bcb08b23fc995d4503dfb895cd2b203d

    - Use thesame command to create one more for the refresh token ...

    6d7d4f0f6d4f177984c10b3098ef182d449f642c2685caa1bd79c805c173bf8c2f1d2458d9d2e75af73df65f16aa4b144fa765c515a3755a28b94a51af2d2042

# .env

        ACCESS_TOKEN_SECRET=280abfdc938571d2d918497c67205f37eb3a8edc4d0053209e18a4d0c27ea5caa4f25e566a53fa89d88d3e462d5adf94bcb08b23fc995d4503dfb895cd2b203d

        REFRESH_TOKEN_SECRET=6d7d4f0f6d4f177984c10b3098ef182d449f642c2685caa1bd79c805c173bf8c2f1d2458d9d2e75af73df65f16aa4b144fa765c515a3755a28b94a51af2d2042

# NB .. Add .env to gitigore file ... so that it should not be addend to your github ...

# .gitignore

    node_modules
    . env

# ... Back in the authControllers .. were we left provision for the JWT ..

# controllers/authController.js

# imports ..

const jwt = require('jsonwebtoken')
require('dotenv').config()

# ........

# define the access token

    const accessToken = jwt.sign()

    -jwt.sign()
        -paramter(payload)
            -1st = username object ....
                -Nb .. Do not pass in a password .. cause this will hurt the security ..
            -2nd = the access token secret we defined in the .env file
            -3rd = options value (when the token expires ) we'll make it 30s for this tutorial , but normally about 5mins in production

# code ..

const accessToken = jwt.sign(
{'username':foundUser.username} ,
process.env.ACCESS_TOKEN_SECRET,
{expiresIn: '30s'}
)

# ......

# define the refresh token

    same parameters as above
        -2nd = refresh token secrete
        -3rd = expires in 1 day for this tutorial ..

# code ..

const refreshtoken = jwt.sign(
{'username':foundUser.username} ,
process.env.REFRESH_TOKEN_SECRET,
{expiresIn: '1d'}
)

# ......

# We want to save our refresh token in the database which will also allow us to create a logout route in the future that will allow us to validate a refresh token when a user logs out ...

    for now we are working with json files for now cause we haven't connected to an actual database ...

       // .... .. Saving the refresh token .....
        // create an array to remove the loged in user
        const otherUsers = UserDB.users.filter((p) => p.username !== foundUser.username)
       // add the refreshtoken to the current User
       const currentUser = {...foundUser , refreshtoken}
        // store the current user  in the database ...
        UserDB.setUsers(otherUsers.push(currentUser))
        // write to json file ...
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models','users.json')
            , JSON.stringify(UserDB.users)
            )
        // ..............

# this helps to invalidate the refreshtoken when the user logs out before the 1 day expires ...

# We still need to send the refreshToken and accessToken to the user (client )

    -In the Front-end ... storing the access token in the local storage is not save ...

    -In the back end ... we can store it in memory
        -we can store it in a cookie and set the cookie to http(not available to javascript) .. so that it should'nt be vulnarable to attack

# res.cookie()

    parameters
        -1st = name of cookie
        -2nd = what you are storing ... in this case a "refreshToken"
        -3rd = cookie settings , {
            -set to  http ,
            -How long the data should stay in the cookie ..
        }
    also sending the accessToken to the user ...

# code ..

            res.cookie('jwt', refreshtoken , {
                httpOnly: true ,
                maxAge: 24 * 60 * 60 * 1000
            })
            res.json({accessToken})

# .......



# Now the auth controller is complete... 

# controller/authController.js 
const UserDB = {
    users : require("../models/users.json"),
    setUsers : (newuser) => {this.users = newuser}
}

const path = require('path') 
const fsPromises = require('fs').promises 

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const { kMaxLength } = require("buffer")
require('dotenv').config()



const HanleLogin = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) res.status(400).json({'message': `Username or Password has not been given`})

    //check if the user has an account and logg him out if he does not 
    const foundUser = UserDB.users.find((p)=>p.username === user) 
    if(!foundUser)res.sendStatus(401) //UnAuthorized .... 

    //Compare password 
    const match = await bcrypt.compare(pwd , foundUser.password)
    if(match){
# ...................
        // We are going the apply JWT(Normal token and refresh token ) to use in the other routes we want protected in our api 
      
        //define accesstoken 
        const accessToken = jwt.sign(
            {'username':foundUser.username} , 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: '30s'}
        )
        //define refreshtoken 
        const refreshtoken = jwt.sign(
            {'username':foundUser.username} , 
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: '1d'}
        )

        // .... .. Saving the refresh token ..... 
        // create an array to remove the loged in user 
        const otherUsers = UserDB.users.filter((p) => p.username !== foundUser.username)
       // add the refreshtoken to the current User 
       const currentUser = {...foundUser , refreshtoken}
        // store the current user  in the database ... 
        UserDB.setUsers(otherUsers.push(currentUser))
        // write to json file ... 
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models','users.json')
            , JSON.stringify(UserDB.users)
            )
        // ..............

        // save to cookie and send to user ... ... 
            res.cookie('jwt', refreshtoken , {
                httpOnly: true , 
                maxAge: 24 * 60 * 60 * 1000 
            })
            res.json({accessToken})
# ...................
        // ....................
       // res.json({'message': `User ${user} is logged in` , refreshtoken})
    }else{
        res.sendStatus(401) // Unauthorized 
    }

} 

module.exports = {HanleLogin}
# ..........................


# we now go to the middle ware and  create a new middleware 













