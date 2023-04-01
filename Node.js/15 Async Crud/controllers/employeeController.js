const Employee = require("../models/Employee");
const User = require("../models/User")









// httpGET
const getAllEmployees = async (req,res) => {
    const employees = await Employee.find() ;    // to get employees ...
    if(!employees) return res.status(204).json({'message' : 'No employees found ..'})
    res.json(employees)


    console.log(req.cookies.jwt)
}

//httpPOST

const postEmployee = async (req,res) => {


    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json('message' , "first and last name are requird")
    }
    try{
        const result = await Employee.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname
        })
        res.status(201).json(result)
    }catch(err){
        console.log(err)
    }

}

//httpPUT 
const putEmployee = async (req,res) => {


    if(!req?.body?.id){
        return res.status(400).json({'messsage' : 'An ID is required ... '})
    }


    //get the employee 
    const employee = await Employee.findOne({_id :parseInt(req.body.id)})

    // if error in no employee 
    if(!employee){
        res.status(204).json({'message': `Employee with id: ${req.body.id} does not exist`})
    }

    //set the values of this new employee object .. 
    // employee.id = req.body.id 
    if(req.body?.firstname) employee.firstname = req.body.firstname 
    if(req.body?.lastname) employee.lastname = req.body.lastname 
    const result = await employee.save()

    console.log(save)
    // filter out the employee and replace it ... 

    
}

//httpDELETE 
const deleteEmployee = async (req,res) => {

    if(!req?.body?.id){
        return res.status(400).json({'messsage' : 'An ID is required ... '})
    }

    const employee = await Employee.findOne({_id :parseInt(req.body.id)})

    // if error in no employee 
    if(!employee){
        res.status(204).json({'message': `Employee with id: ${req.body.id} does not exist`})
    }

    const result  = await employee.deleteOne({_id :req.body.id })


    res.json(result)
}



//httpGET_id 

const getSingleEmployee = async (req, res) => {

    if(!req?.params?.id){
        return res.status(400).json({'messsage' : 'An ID is required ... '})
    }


    const employee = await Employee.findOne({_id : req.params.id})

    if(!employee) {
        res.status(204).json({'message':`Element with id: ${parseInt(req.params.id)} does not exist`})
    }
    res.json(employee)

}

module.exports = {
    getAllEmployees,
    postEmployee,
    deleteEmployee,
    putEmployee,
    getSingleEmployee
}