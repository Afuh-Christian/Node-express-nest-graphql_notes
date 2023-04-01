const express = require('express') 
const { HanleLogin } = require('../../controllers/authContoller')
const authrouter = express.Router() 



authrouter.route('/')
    .post(HanleLogin)
  

module.exports = {authrouter}