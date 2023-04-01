
# In the front end .. 
     fetch(
        , {
            credentials : "include"
        }
     ) 

     - we need to include a credentials options on the front end  to have fetch send the cookie ... 
     - If axios ... a withcredentials flag that needs to be sent as well ... 

     -this set up a chain of events .. 

# we get a cors error on the crome ... .... 
    You will be blocked by cors because the value of the Access-Control-Allow-Credentials of the header in the response is '' .and it needs to be set to 'true'

    This is called a "PREFLIGHT OPTIONS CHECK" ... 
        -it's and  option http method request 

    We have to set the Access-Control-Allow-Credentials = true .. when we send the cookies back ..  because that's what is expected with fetch 


# HOW TO FIX THIS .... 
# BACKEND CODE .... 

# config/corsOptions.js 


# create a credentials middleware .. 
 - set the .... ... ... ...  Access-Control-Allow-Credentials = true

const { allowedOrigins } = require("../config/corsOptions")

const credentials =( req, res , next) => {
    const origin = req.headers.origin 
    if(allowedOrigins.includes(origin)){
        res.header("Access-Control-Allow-Credentials" , true)
    }
    next()
}

module.exports = {credentials} 


# server.js ... 

    - include this before the cores middelware .. .. else corsOptions will not see it and will throw an errow .. 



//custom middleware logger
app.use(logger)

// cors-credentials ..
app.use(credentials)

// cors 
app.use(cors(corsOptions))


# ..... 
# .................................................................################## 

# Nb ... we need to set ->         sameSite = 'None' ... .so that the cors should work .... 


# also set secure = true ... 


Go to the all the places in the code , were the cookies were being set ... and also when the cookies are deleted ... 

sameSite = 'None',
secure = true 


# ...code ...
   res.cookie('jwt', refreshToken , {
                httpOnly: true , 
                maxAge: 24 * 60 * 60 * 1000 ,
                sameSite : "None" , 
                secure : true
            })
# .........

 
