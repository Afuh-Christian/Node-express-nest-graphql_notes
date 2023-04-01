const express = require('express') 
const { HandleRefreshToken } = require('../../controllers/refreshTokenController')
const refreshTokenRouter = express.Router() 



refreshTokenRouter.route('/')
    .get(HandleRefreshToken)
   

module.exports = {refreshTokenRouter}