
const mongoose = require('mongoose') 

const {model , Schema} = mongoose 


const userSchema = new Schema({
    username  : {
        type : String , 
        required : true 
    },
    roles :{
            User : {
                    type : Number , 
                    default : 2001 
                    }, 
            Editor : Number , 
            Admin : Number
    }
,
    password  : {
        type : String , 
        required : true 
    },
 
    refreshToken : String
})


module.exports = model('User' , userSchema)






