


const fsPromises = require('fs').promises
const path = require('path') 


const fileOps = async () => {
    try {
         const data = await fsPromises.readFile(path.join(__dirname,'Files','starter.txt'),'utf8')
        console.log(data)

        await fsPromises.unlink(path.join(__dirname,'Files','starter.txt'))
        await fsPromises.writeFile(path.join(__dirname,'Files','write.txt'),data)
        await fsPromises.appendFile(path.join(__dirname,'Files','write.txt'),"\n\n Well done bro , append done ")
        await fsPromises.rename(path.join(__dirname,'Files','write.txt'),path.join(__dirname,'Files','Newfilename.txt'))
        
        
        const alterdata = await fsPromises.readFile(path.join(__dirname,'Files','Newfilename.txt'),'utf8')
        console.log(alterdata)

    }catch (err) {
        console.log(err)
    }
}

fileOps()

// fs.readFile(path.join(__dirname, 'Files','starter.txt'),'utf8', (err , data) => {
//     if (err) throw err 
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname, 'Files','write.txt'),"This is a new item in this file ", (err) => {
//     if (err) throw err
//     console.log("write complete")


//     fs.appendFile(path.join(__dirname, 'Files','write.txt'),"Pep Gaurdiola ", (err) => {
//         if (err) throw err
//         console.log("Append complete")

//         fs.rename(path.join(__dirname, 'Files','write.txt'), path.join(__dirname, 'Files','newname.txt'),(err) => {
//             if (err) throw err 
//             console.log("Rename Complete")
//         })

//     })
// })










