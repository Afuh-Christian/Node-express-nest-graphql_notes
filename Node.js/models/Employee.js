const mongoose = require('mongoose') 

const {model , Schema}  = mongoose



const employeeShema = new Schema({
    firstname : {
        type : String , 
        required : true 
    },
    lastname : {
        type : String , 
        required : true 
    }
})


module.exports = model('Employee', employeeShema)









