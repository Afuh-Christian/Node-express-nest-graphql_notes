# 1 .env ... 

ACCESS_TOKEN_SECRET=280abfdc938571d2d918497c67205f37eb3a8edc4d0053209e18a4d0c27ea5caa4f25e566a53fa89d88d3e462d5adf94bcb08b23fc995d4503dfb895cd2b203d
REFRESH_TOKEN_SECRET=6d7d4f0f6d4f177984c10b3098ef182d449f642c2685caa1bd79c805c173bf8c2f1d2458d9d2e75af73df65f16aa4b144fa765c515a3755a28b94a51af2d2042


DATABASE_URI = mongodb+srv://mongotut:deLe1017@cluster0.b3xxxpf.mongodb.net/CompanyDB

# 2 ....install mongoose 

    npm install mongoose 

this is a library that makes working with mongodb much easier

# 3 ....server.js 
 import mongoose ..

 const mongoose = require('mongoose')

 # 4 create a connectin connextion configurations in  config/dbConn.js

 #  config/dbConn.js 

 const mongoose = require('mongoose') 

const connectDB = async () =>{
    try{  
        await mongoose.connect(process.env.DATABASE_URI , {
            useUnifiedTopology : true ,
            useNewUrlParser: true
        })
      }catch(err){console.log(err)}
}

module.exports = {connectDB}


# server.js .... 
-import the above ... 

# .. at the top 
const { connectDB } = require('./config/dbConn');

//Connect to MongoDB 
connectDB()
# 


# server.js ... let's prevent the app from listening if the connection to the mongoDB fails 


const mongoose = require('mongoose');
const { connectDB } = require('./config/dbConn');

//Connect to MongoDB 
connectDB()


// other code.........................

mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT , () => {
        console.log(`Server running at port ${PORT}`)
    })
})


# You can check the mongoDb doc for more event's ... 

now test this on thunder client ... it works ... 

