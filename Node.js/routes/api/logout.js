const express = require('express') 
const { HandleLogOut } = require('../../controllers/logoutController')
const logoutRouter = express.Router() 



logoutRouter.route('/')
    .get(HandleLogOut)
   

module.exports = {logoutRouter}