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
        const newUser = {'username': user , 'password':HashedPwd}
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
