const { gql } = require("apollo-server")


exports.typeDefs = gql`
type Query{
     hello:String
     products(filter: ProductsFilterInput): [Product!]!
     product(id: ID): Product!

     categories: [Category!]!
     category(id: ID): Category!   
 }



input ProductsFilterInput{
    onSale:Boolean
    avgRating: Int
}

 type Category{
     id:ID! 
     name:String!
     products(filter: ProductsFilterInput): [Product!]!
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
     reviews:[Review!]!
 }

type Review{
    id:ID! 
    title:String! 
    date:String!
    comment:String!
    rating:Int!
    productId:ID!
}

`


