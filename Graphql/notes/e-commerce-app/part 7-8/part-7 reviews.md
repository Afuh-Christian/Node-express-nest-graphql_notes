# Adding reveiws 
# Nested in the products 



# Shema.js

const { gql } = require("apollo-server")


exports.typeDefs = gql`
type Query{
     hello:String
     products: [Product!]!
     product(id: ID): Product!

     categories: [Category!]!
     category(id: ID): Category!   
 }


 type Category{
     id:ID! 
     name:String!
     products: [Product!]!
 }


 type Product{
     id:ID!
     name:String! 
     description:String!
     Qauntity: Int!
     image: String!
     price:Float !
     onSale:Boolean!
     category:Category!
# ..........
     reviews:[Review!]!
# ..........

 }
# ..........
type Review{
    id:ID! 
    title:String! 
    comment:String!
    rating:Int!
    productId:Int!
}
# ..........


`




# resolvers / Products.js 

exports.Product = {
    category : (parent, args , {categories}) => {
      const c = categories.find((c) => c.id === parent.categoryId )
      return c? c : null 
     },
# ..........
     reviews : (parent,args,{reviews}) => {
       const c = reviews.filter((c) => c.productId === parent.id)
       return c? c : null 
      }
# ..........

     
 }


# index.js 


const {ApolloServer} = require('apollo-server');
const { findBreakingChanges } = require('graphql');
const {typeDefs} = require("./schema")

const {Product} = require("./resolvers/Product")
const {Query} = require("./resolvers/Query")
const {Category} = require("./resolvers/Category")
# ..........
const {products , categories , reviews} = require("./db")
# ..........

const  server = new ApolloServer({
typeDefs,
resolvers : {
  Query,
  Category,
  Product
},
context : {
 products,
  categories ,
# ..........
  reviews
# ...........
}
})


server.listen().then(({ url })=>{
    console.log("server is running on" + url )
})










