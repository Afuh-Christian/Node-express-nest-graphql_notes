# To group the products based on a particular category 

# 

type Category{
    id: ID! 
    name: String! 
    products: [Products!]! 
}

# we create a new resover for the Category ... because we were using the resolver fo the Query 
# we will use parent in the resolver 

  Category : {
        products : (parent,args,content) =>{
            const c = products.filter((p) => p.categoryId === parent.id) 
            return c? c : null

            // console.log(parent)
        } 
    }

# parent = object containing information about the parent 

# .... full code ... 
const {ApolloServer , gql} = require('apollo-server');
const { findBreakingChanges } = require('graphql');

const typeDefs = gql`
   type Query{
#
        category(id: ID): Category! 
#  
    }


    type Category{
        id:ID! 
        name:String!
#
        products: [Product!]!
#
    }


    type Product{
        id:ID!
        name:String! 
        description:String!
        Qauntity: Int!
        image: String!
        price:Float !
        onSale:Boolean!
    }
`

const resolvers = {
    Query :{
    category : (parent,args,content) => {
        const c = categories.find((p) => p.id === args.id) 
        return c? c : null
    },
},
#
    Category : {
        products : (parent,args,content) =>{
            const c = products.filter((p) => p.categoryId === parent.id) 
            return c? c : null
#
            // console.log(parent)
        } 
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









# ...............

