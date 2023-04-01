const data = {
    employees : require("../models/employees.json"),
    setEmployees : function (data) {
        this.employees = data
    }

} 

// httpGET
const getAllEmployees = (req,res) => {
    res.json(data.employees)


    console.log(req.cookies.jwt)


}

//httpPOST

const postEmployee = (req,res) => {

    const newEmployee = {
        id: parseInt(data.employees.length + 1 ),
        firstname : req.body.firstname ,
        lastname : req.body.lastname 
    }


     if(!newEmployee.firstname || !newEmployee.lastname){
        res.status(400).json({'message':"First name and Last name must be provided"})
     }

    data.setEmployees([...data.employees , newEmployee])


    res.status(201).json(data.employees)

}

//httpPUT 
const putEmployee = (req,res) => {
    //get the employee 
    const employee = data.employees.find((e)=>e.id === parseInt(req.body.id))

    // if error in no employee 
    if(!employee){
        res.status(400).json({'message': `Employee with id: ${req.body.id} does not exist`})
    }

    //set the values of this new employee object .. 
    // employee.id = req.body.id 
    employee.firstname = req.body.firstname 
    employee.lastname = req.body.lastname 

    // filter out the employee and replace it ... 
    const employeesfilter = data.employees.filter((e) => e.id !== parseInt(employee.id))
    const unsortedData =  [...employeesfilter, employee]
    data.setEmployees(unsortedData.sort((a,b) =>  a.id > b.id? 1 : a.id < b.id? -1 : 0))    
    res.json(data.employees)
}

//httpDELETE 
const deleteEmployee = (req,res) => {
    const delElement = data.employees.find((e) => e.id === parseInt(req.body.id)) 

    if(!delElement) {
        res.status(400).json({'message':`Element with id: ${parseInt(req.body.id)} does not exist`})
    }

    const filterElements = data.employees.filter((e) => e.id !== delElement.id)
    //console.log(filterElements)

    data.setEmployees(filterElements)
    res.json(data.employees)
}



//httpGET_id 

const getSingleEmployee = (req, res) => {
    const employee = data.employees.find((e)=>e.id === parseInt(req.params.id))

    if(!employee) {
        res.status(400).json({'message':`Element with id: ${parseInt(req.params.id)} does not exist`})
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