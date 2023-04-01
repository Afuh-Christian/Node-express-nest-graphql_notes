const {ApolloServer} = require('apollo-server');
const { findBreakingChanges } = require('graphql');
const {typeDefs} = require("./schema")

const {Product} = require("./resolvers/Product")
const {Query} = require("./resolvers/Query")
const {Category} = require("./resolvers/Category")

const {products , categories} = require("./db")

const  server = new ApolloServer({
typeDefs,
resolvers : {
  Query,
  Category,
  Product
},
context : {
 products,
  categories
}
})


server.listen().then(({ url })=>{
    console.log("server is running on" + url )
})








