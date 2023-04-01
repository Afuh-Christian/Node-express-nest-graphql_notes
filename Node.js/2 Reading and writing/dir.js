const fs = require('fs')



if (!fs.existsSync('./NewPath')) {
fs.mkdir('./NewPath', (err)=>{
    if(err) throw err 
    console.log("Directory created")
})
}else {
    fs.rmdir('./NewPath', (err)=>{
        if(err) throw err 
        console.log("Directory deleted")
    })
}


