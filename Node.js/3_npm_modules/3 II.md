

# current Date and time 

const { format } = require('date-fns')

const date = format(new Date(), 'yyyyMMdd\tHH:mm:ss')

console.log(date)

# uuid 

    npm i uuid 

   const {v4 : uuid} = require('uuid') 

version 4 as uuid 

    console.log(uuid())

# (mainvertion).(minorversion).(patch)

# (^) means :  "uuid": "^8.3.2"
    -allow an update to the minor and patch 
    -updating major versions could bring forth breaking changes 

# (~) means : "uuid": "~8.3.2"
    -update only the patch 

# (*) means : "uuid": "*" 
    -update everything all the time 
    -this method is not save 


# ommiting the (^) or (~) means :   "uuid": "8.3.2"
    -only that version will work for this project 


# to install a particul version 
#    - add @(vertion)
    -npm i uuid@8.3.2 


# To check for updates on all installed packages 
    -npm update 


# To uninstall 
    npm un 
    npm rm 
    npm uninstall 

# Scripts 
    -After uninstalling a package , also remove from the 
    scripts

# Dev dependencies 
    -When installing them , they always have to have the specific flag (-D) at the end e.g

    npm i nodemon -D

    -But if it's for production you do not need the flag 


