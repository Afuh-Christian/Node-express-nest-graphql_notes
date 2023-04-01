
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// Handler of the register route 
const HandleNewUser = async (req, res) => {
    const {user , pwd} = req.body 
    if(!user || ! pwd) return res.status(400).json({'message': `Username or Password has not been given`})
    //Check for duplicates 
const duplicate = await User.findOne({username : user}).exec()

if(duplicate) return res.sendStatus(409) //conflict
    try{
        //encrypt password 
        const HashedPwd = await bcrypt.hash(pwd , 10)
        // store the new user 
        const result = await User.create({
            'username': user , 
            'password':HashedPwd
        })

        console.log(result)
        
        res.status(201).json({'success': `New user ${user} created`})

    }catch(err) {
    res.status(500).json({ 'message': err.message})
}
}

module.exports = {HandleNewUser}
