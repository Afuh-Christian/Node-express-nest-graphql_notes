# 
    -Create files 
    -Reading  files
    -Writing  files
    -updating  files
    -work with directories on the server 

#    we will be using the "file system common core module" for that 

# node js is a js runtime that runs on the server instead of on the browser 

# open the node js doc  and go to file system 
    -Here you can see all the various operations you can do on files 
    


# 1 .. import fs 

# A ..............................................................READING FILES................................ readFile
    -has 2 parameter 
    -1st = path to the file 
    2nd  = call back function with 2 parameters 
        -data 
        -error 
    
# code ......

const fs = require('fs') 

fs.readFile('./Files/starter.txt', (err , data) => {
    if (err) throw err 
    console.log(data.toString())
})

# ...........

# Or we could add another parameter(encoding type) eg utf8 ... 
    -now we won't need the toString() 

# code ...... 

const fs = require('fs') 

fs.readFile('./Files/starter.txt','utf8', (err , data) => {
    if (err) throw err 
    console.log(data)
})

# ..........



# Catching errors in node js 

process.on('uncaunghtException', (err) => {
    console.log(`there was an error,${err}` )
    process.exit(1)
} 

# Readfile 
    -is async
    -it runs along with all the other functions in the app
    -await = causes the other functions to be run before the readfile 
    

# a better way to specify the path ... 

    const path = require('path') 

    path.join(__dirname, 'Files', 'starter.txt)


# code ....
fs.readFile(path.join(__dirname, 'Files','starter.txt'),'utf8', (err , data) => {
    if (err) throw err 
    console.log(data)
})
# .........  



# ....................................................WRITING FILES ...............................................writeFile

# takes 4 paraters ... only 3 are needed ... utf8 is set by defualt 
    - path 
    - data to be written 
    - (err) => {}


# code .... 

fs.writeFile(path.join(__dirname, 'Files','write.txt'),"This is a new item in this file ", (err) => {
    if (err) throw err
    console.log("complete")
})


# .......
    


#  .........................................UPDATING FILE ............................................. append

# same as write 
    -will create the file if it does not exist 
    -running the code multiple files keeps appending a new text 

# code .... 


fs.appendFile(path.join(__dirname, 'Files','test.txt'),"Pep Gaurdiola ", (err) => {
    if (err) throw err
    console.log("Append done")
})

# .........




# for the update to work , we need to place the appendFile within the callback of the writeFile 
    -Both with same path
# code ......

fs.writeFile(path.join(__dirname, 'Files','write.txt'),"This is a new item in this file ", (err) => {
    if (err) throw err
    console.log("write complete")


    fs.appendFile(path.join(__dirname, 'Files','write.txt'),"Pep Gaurdiola ", (err) => {
        if (err) throw err
        console.log("Append complete")
    })
})

# .......

# NB ... whatever you wish to do about a file should be done the the callback function 

# ................RENAME ............................................. rename
# parameters 
    -1st = old file name 
    -2nd = new file name 
    -3nd = (err) => {}


# code .....

  fs.rename(path.join(__dirname, 'Files','write.txt'), path.join(__dirname, 'Files','newname.txt'),(err) => {
            if (err) throw err 
            console.log("Rename Complete")
        })

# ..........

# we will put this within the callback of the append 

# code .....


fs.writeFile(path.join(__dirname, 'Files','write.txt'),"This is a new item in this file ", (err) => {
    if (err) throw err
    console.log("write complete")


    fs.appendFile(path.join(__dirname, 'Files','write.txt'),"Pep Gaurdiola ", (err) => {
        if (err) throw err
        console.log("Append complete")

        fs.rename(path.join(__dirname, 'Files','write.txt'), path.join(__dirname, 'Files','newname.txt'),(err) => {
            if (err) throw err 
            console.log("Rename Complete")
        })

    })
})
# ...........



# ....................Avoiding callback hell 

    -in vanilla = > we use async await 

#   In node js 
    -import promises 
    -create an async function for all the file operations 

# ..code ..

const fsPromises = require('fs').promises
const path = require('path') 


const fileOps = async () => {
    try {
         const data = await fsPromises.readFile(path.join(__dirname,'Files','starter.txt'),'utf8')
        console.log(data)
    }catch (err) {
        console.log(err)
    }
}

# ...........





# Now we know how to prevent nesting callback by using promises and async await 

# Let's now resolve the  problem we had before 

# code .........




const fsPromises = require('fs').promises
const path = require('path') 


const fileOps = async () => {
    try {
         const data = await fsPromises.readFile(path.join(__dirname,'Files','starter.txt'),'utf8')
        console.log(data)
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




# .........................................DELETE FIILE .............unlink
# parameters 
    -path

# ..............

# code ... 

const fs = require('fs')

fs.unlink(path.join(__dirname,'Files','starter.txt'))

# OR 

const fs = require('fs').promises

const delfile = async () => {
     await fsPromises.writeFile(path.join(__dirname,'Files','starter.txt'))
}

delfile()


#  ...

# full code ... 





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


# ...........











# ................................large sums of  DATA ..............................


# When working with large amounts of data we need to streams ... 

const path = require('path') 
const fs = require('fs') 


# createReadStream  ....parameters 
    -path 
    -{encoding: 'utf-8'}   
#  
const rs = fs.createReadStream(path.join(__dirname,'Files','lorem.txt'),{encoding:'utf-8'})
#



# createWriteStream ...parametes 
    -path 
# 
const ws = fs.createWriteStream(path.join(__dirname,'Files','lorem-new.txt'))
#

# listen for data .... 
#

rs.on('data' , (datachunk) => {
    ws.write(datachunk)
})

# or more effecient method 

rs.pipe(ws)

# 



# code ....

const path = require('path') 
const fs = require('fs') 
const rs = fs.createReadStream(path.join(__dirname,'Files','lorem.txt'),{encoding:'utf-8'})
const ws = fs.createWriteStream(path.join(__dirname,'Files','lorem-new.txt'))
rs.on('data' , (datachunk) => {
    ws.write(datachunk)
})

# .........




# ...............................CREATING A DIRECTORY ......................................mkdir

# parameters 
    -./(new dirname)
    -(err) => {  }


# ... code ... 
 
const fs = require('fs')


fs.mkdir('./NewPath', (err)=>{
    if(err) throw err 
    console.log("Directory created")
})

# .................



#  make a condition to prevent us from writing over this director if it already exist ...using the existsSync

const fs = require('fs')

# f (!fs.existsSync('./NewPath')) {
fs.mkdir('./NewPath', (err)=>{
    if(err) throw err 
    console.log("Directory created")
})
}else {
    console.log("Folder exists")
}




# .....................DELETING DIRECTOR ..........................rmdir
# parameters 
    - ./(dir name) 
    - (err) => {}



 fs.rmdir('./NewPath', (err)=>{
        if(err) throw err 
        console.log("Directory deleted")
    })



# full code ... 

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


# .........







