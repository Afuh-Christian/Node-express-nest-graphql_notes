# Arrays

# Arrays of Scalars

# hello: [String]

# hello: () = {return ["Christian" , "tanlaka" , "duke" , "Flavian" , "modric"]}

const typeDefs = gql` type Query{ hello:[String]}`

const resolvers = {
Query: {
hello : () => {
return ["Christian" , "tanlaka" , "duke" , "Flavian" , "modric"]
}
}
}

# Nb ... 1 - to reject any null value in the array .... hello: [String!]

# 2 - to reject the array itself from being null .... hello: [String!]!

    -if one value is null ... it will all give an error

# ..........................................................



# ............................................................to get a select product(s) ...................
    -use one of it's attributes to query an get the product(s) you want 
    -pass a parameter 
# code ... 

product(id: String):Product

# ........


const typeDefs = gql`
    type Query{
        hello:String
        products:[Product!]!
#
        product(id: ID!) : Product
#
    }

    type Product{
        id:String!
        name:String! 
        description:String!
        Qauntity: Int!
        image: String!
        price:Float !
        onSale:Boolean!
    } 
`


# how do we resolve this 
# The resolver has 3 arguments 
    -Parent 
    -args   = is an object containing the parameters 
    -context
# parent & context will not be used for now 

# in this case 

    args = {id : '2434534'} 

    we can have many parameters 
    
# code ... resolvers

  product : (parent,args,context) =>{
          const productID = args.id
          const product =  products.find((p) => p.id === productID)
          
          return product? product : null
        
        }

# ......

# full code .... 


const typeDefs = gql`
    type Query{
        product(id: ID!) : Product
    }

    type Product{
        id:String!
        name:String! 
        description:String!
        Qauntity: Int!
        image: String!
        price:Float !
        onSale:Boolean!
    } 
`

const resolvers = {
    Query: {
        product : (parent,args,context) =>{
          const productID = args.id
          const product =  products.find((p) => p.id === productID)
          
          return product? product : null
        }
    }
}


# .............


# ...............On Apollo - Server 

# command 

query {
  product(id: "47bf3941-9c8b-42c0-9c72-7f3985492a5b"){
    name 
    description
  }
}

# result 

{
  "data": {
    "product": {
      "name": "Soccer Ball",
      "description": "Round ball"
    }
  }
}








# ...................... To auto-restart server on text change..............................................

-npm install nodemon -g

# in package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev" : "nodemon index"
}

-npm run dev

# .............................................................................................................
