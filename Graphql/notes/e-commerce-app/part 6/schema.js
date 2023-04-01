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
     category:Category
 }
`


