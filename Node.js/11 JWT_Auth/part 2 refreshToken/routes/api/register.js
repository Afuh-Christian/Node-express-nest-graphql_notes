const express = require('express') 
const { HandleNewUser } = require('../../controllers/registerController')
const registerrouter = express.Router() 



registerrouter.route('/')
    .post(HandleNewUser)
  

module.exports = {registerrouter}