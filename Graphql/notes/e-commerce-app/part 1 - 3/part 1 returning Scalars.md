# Commands

mkdir e-commerce-app
cd e-commerce-app
node -v

# install graphQl extention in vs code

-GraphQl by GraphQL Foundation

# ... We will Build a graphQL server with Apollo server

npm init -y ... to start a node project
-package.json
npm install apollo-server graphql
-node_modules
-package-lock.json

# we need a place for the apollo server to live in ...

-we create index.js file

# we create the server in the index.js file

# instantiate apollo server

const { ApolloServer } = require("apollo-server");

const server = ApolloServer()

# listen to server

# .then => asynchronous

# get a callback

server.listen().then(({ url }) => {
console.log("Server is up at " + url);
});

# run "node index" on command line

- we get an error

# With our server , we need to define :

    -A type
    -A resolver

# NB When creating a graphql server .... you need to specify tow things

    -The type definition (shema)
    -The Resolvers

# ..........Shema ....

    -The way the data is going to look (  query , post , mutation .. etc )

# .........Resolvers .....

    -Are actual functions that returns the data that confirm to the way we have specified them in the schema

# ..... Example ....

    -SCHEMA
        fruits : [String]

    -RESOLVER
        fruits : () => {
          return    [ bananas , apple  ]
        }

# ....break ......................................00:30:00

# gql is need to create the type schema

index.js ...file

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql` type Query{ hello:String }`

const resolvers = {
Query: {
hello : () => {
return "Hello World"
}
}
}

const server = new ApolloServer({
typeDefs,
resolvers
})

server.listen().then(({ url }) => {
console.log("Server is up at " + url);
});

# node index ... to run

# On console ... http://localhost:4000/

    - You get a page were you can test your graphql
    -How you give a command
     query{
        hello
     }
     -this will query the contents of hello

# NB

const typeDefs = gql` type Query{ hello:String }`

# Sting = Scalar type

# hello can return

    -Object type
    -Scalar type  (String, Int Float ,Boolean)

# more on scalar

# code ...........................................................

const { ApolloServer,gql } = require("apollo-server");

const typeDefs = gql` type Query{ hello:String numberOfStudents: Int }`

# ............NB .... no space btwn "hello" & ":" nor "numberOfStudents" & ":"

const resolvers = {
Query: {
hello : () => {
return "Hello World"
},
numberOfStudents : () => {
return 75
}
}
}

const server = new ApolloServer({
typeDefs,
resolvers
})

server.listen().then(({ url }) => {
console.log("Server is up at " + url);
});

# ..................................................

# code ...

const { ApolloServer,gql } = require("apollo-server");

const typeDefs = gql` type Query{ hello:String numberOfStudents: Int price: Float isOn: Boolean }`

const resolvers = {
Query: {
hello : () => {
return "Hello World"
},
numberOfStudents : () => {
return 75
},
price : () => {
return 598648.888
},
isOn :() => {
return true
}
}
}

const server = new ApolloServer({
typeDefs,
resolvers
})

server.listen().then(({ url }) => {
console.log("Server is up at " + url);
});

# ...............null

by defualt if any of the scalars have no value it's automatically given the value ....null

# .......We want it to throw an error when the value = null

# - Append "!" at the end of the scalar

              const typeDefs = gql`
    type Query{
        hello:String!
        numberOfStudents: Int!
        price: Float!
        isOn: Boolean
    }

`

# now hello , numberOfStuents and price can't take the value null
