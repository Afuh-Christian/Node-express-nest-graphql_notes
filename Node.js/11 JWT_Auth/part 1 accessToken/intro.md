# We will be protecting route with JSON  WEB TOKENS ... 

# Definition 
    A form of user identification that is issued after the initial user authentication takes place

    -When a user completes the authentication(login) process , they are authenticated , our rest api 
      will issue the client app 
        -access token 
        -refresh token 

# Acess token 
    -Short time to expire 
    -  5 - 15 minutes 

    -sent as json 
    -client stores in memory 
    -Do not store as local memory or cookie

# Refresh token
    -Long time to expire
    - hours , days

    -sent as httpOnly Cookie 
    -Not accessible via Javascript 
    -Must have an expiry at some point

    -Should not have the ability to issue new refresh tokens , because that grands indefinite access if a refresh token falls into the wrong hands 
    


# The overall ACCESS TOKEN process 
    -Issued at Authorization 
    -Client uses for API access untill it expires  
    -Verified with middleware  (everytime the access token is used to make a reqeuest)
    -New token issued at Refresh request

# The overall ACCESS TOKEN process
    -Issued at Authorization
    -Client uses to request new ACCESS TOKEN 
    -Verified with endpoint & database  
    -Must be allowe to expire or logout  ( so that indefinite access cannot be gained ) 

# While no security majors are perfect ,  we want to consider the risk of 
    - XSS : cross-site scripting 
    - CSRF : cross-site request forgery



# PACKAGES TO INSTALL 
    npm i dotenv 
    npm i jsonwebtoken 
    npm i cookie-parser

    OR 

    npm i dotenv jsonwebtoken cookie-parser 












