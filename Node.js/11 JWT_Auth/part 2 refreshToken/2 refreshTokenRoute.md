# routes/api/refresh.js

# code ... 
const express = require('express') 
const { HanleRefreshToken } = require('../../controllers/refreshTokenController')
const refreshTokenRouter = express.Router() 



refreshTokenRouter.post('/', HanleRefreshToken)
   
  

module.exports = {refreshTokenRouter}

# ......

# Now we need to include this route in the server js ...


# server js ... the refreshTokenRouter shoule be added before the jwt.verify because the refresh generates a new access token and that's what the jwt verifies ... 

//RefreshTokenRoute
app.use('/refresh',refreshTokenRouter)

app.use(verifyJWT)
app.use('/employees', employeerouter)


# .... the refresh endpoint will recieve the cookie that has the refresh token and that will issue a new access token once the old access token has expired 

# now test this in thunder client ... .http://localhost:3500/login 

# when you login , you get a cookie and the refresh token is store in that cookie
# the refresh token can be used to generate a new access token at this endpoint http://localhost:3500/refresh 
# NB ..... you don't need to put anything in the body or auth because it already in the cookie .... 