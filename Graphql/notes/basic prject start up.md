


# ... We will Build a graphQL server with Apollo server

npm init -y ... to start a node project
-package.json
npm install apollo-server graphql
-node_modules
-package-lock.json

# we need a place for the apollo server to live in ...

-we create index.js file

# we create the server in the index.js file



# ...................... To auto-restart server on text change..............................................

-npm install nodemon -g

# in package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev" : "nodemon index"
}

-npm run dev

# .............................................................................................................





const {ApolloServer , gql} = require('apollo-server')



const typeDefs = gql`
   type Query{
        hello:String
    }
`

const resolvers = {
    Query :{
    hello : () => "This is mine" , 
}
}


const  server = new ApolloServer({
typeDefs,
resolvers
})

server.listen().then(({ url })=>{
    console.log("server is running on" + url )
})

// const server = new ApolloServer