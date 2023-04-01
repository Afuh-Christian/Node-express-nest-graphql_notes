const path = require('path') 
const fs = require('fs') 

const rs = fs.createReadStream(path.join(__dirname,'Files','lorem.txt'),{encoding:'utf-8'})


const ws = fs.createWriteStream(path.join(__dirname,'Files','lorem-new.txt'))



// rs.on('data' , (datachunk) => {
//     ws.write(datachunk)
// })

rs.pipe(ws)



