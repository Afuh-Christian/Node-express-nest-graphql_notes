
const express = require('express') 
const employeerouter = express.Router() 

const data = {}
data.employees = require("../../data/employees.json")

// employeerouter.get("/",  (req,res)=> {
//     res.send(`Employ people now`)
// })

// console.log(data.employees)

employeerouter.route("/") 
    .get((req,res) => {
                res.json(data.employees)
            })
    .post((req,res) => {
                res.json({
                   
                    "firstname":req.body.firstname,
                    "lastname":req.body.lastname 
                })
            })

    .delete((req,res) => {
                res.json({
                   "id": req.body.id
                })
            })

employeerouter.route('/:id') 
    .get((req, res) => {
                res.json({
                    "id" : req.params.id
                })
            })
    .put((req,res) => {
                res.json({
                    "firstname":req.body.firstname,
                    "lastname":req.body.lastname 
                })
            })


module.exports = {employeerouter}




