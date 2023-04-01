
// ...allowRoles  = the spread operator makes it posible to take any amount of parameters .... 
// we need to return  an anonymous middleware function inside which takes req,res,next .. 
// .. 

const verifyRoles = (...allowedRoles) => {
    return (req,res,next) =>{
        if(!req?.roles) return res.sendStatus(401) // Unauthorized .. 
        const rolesArray  = [...allowedRoles]
        console.log(rolesArray) 
        console.log(req.roles)
        // to have an array returning booleans ... 
        // in that array of booleans find the onces with true and return them ... 
        const result = req.roles.map((r) => rolesArray.inclues(r)).find((v) => v === true )
        // if none is true .... 
        if(!result) return res.sendStatus(401) //Unauthorized ..  
       
        next()

    }
}

module.exports = { verifyRoles }