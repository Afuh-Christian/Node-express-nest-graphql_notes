# create project folder 

# create server.js file 

# How node.js differs from vanilla js  
# 1   - Node runs on the server  => console is on the terminal
        - terminal type 
            -node 
            -now you can run normal js commands there 

            or you can type 
            -node <filename> (without .js)

    - Vanilla js runs on the server  => console is on the browser dev tools 

# 2   - Node : there a global object 
    - Vanilla js : there's a window object 

# 3   - Node : Many more common modules (modues that relate to os,file system and other things that can be done     on    the  server)
    - Vanilla js :

# 4   - Node : CommonJS modules => uses require
    eg const os = require('os') 
    console.log(os.type())
    console.log(os.version())
    console.log(os.homedir())
    - Vanilla js : ES6 modules  => uses import 
# 5   - Node : 
    __dirname gives us the directory name 
    __filename gives us the directory name + filename

    also 
    require('path').dirname(__filename)  ==  __dirname
    require('path').basename(__filename)  ==  __filename
    require('path').extname(__filename)  ==  file name 

    also 
     require('path').parse(__filename) = 
    {
  root: 'E:\\',
  dir: 'E:\\Saved Files\\Courses\\Web Development  React & Django & Node.js\\Backend webdev\\Javascript\\Node & Express js\\notes\\01TUT',
  base: 'server.js',
  ext: '.js',
  name: 'server'
}

    - Vanilla js :

# 6 node : we can also pull packages 
    
# 7 node : we can create our own modules 
    -create new file eg Math.js
    -create add , subtract , divide , multiply funtion 
    -export them 
        -there are two methods 
#       How to export modules in node js 
        method 1 
            module.exports = {add , subtract}
        
        method 2 
            exports.add = (a,b) => a + b 

# Method 1 is better 

# code 

# module ... Math.js 

                    const add = (a, b) => {
                        return a + b
                    }
                    const subtract = (a, b) => {
                        return a - b
                    }
                    const divide = (a, b) => {
                        return a / b
                    }
                    const multiply = (a, b) => {
                        return a * b
                    }


                    module.exports = {add , subtract , divide , multiply}


# moduel ... server.js 

                    const math = require(./Math) 

                    console.log(math.add(2,4))

 # we could still detructure the Math module 

                    const {add , subtract , divide , multiply} = Math

                    or 

                    const {add} = require('./Math') 


# 7 node : Is missing the Fetch API















# ...................... To auto-restart server on text change..............................................

-npm install nodemon -g

# in package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev" : "nodemon index"
}

-npm run dev

# ........................................................