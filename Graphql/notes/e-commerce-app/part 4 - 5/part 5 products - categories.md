# 1:30:00


# We want to query all the products and their respective categories (if they have  categories) 





# 1 and category: Category as one of the types in the Products 

    type Product{
        name:String! 
        category:Category
    }


# since we have an object type within another object type , like before , we will create a resolver for the products to query the categories (with respective conditions ) 

  Product : {
     category : (parent, args , content) => {
       const c = categories.find((c) => c.id === parent.categoryId )
       return c? c : null 
      }
  }

# we will be returning just an object since we have  a many-one relationship in this case 


# full code ... 
const {ApolloServer , gql} = require('apollo-server');
const { findBreakingChanges } = require('graphql');


const typeDefs = gql`
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

const resolvers = {
    Query :{
    hello : () => "This is mine" , 
    products : () => products,

    product : (parent,args,content) => {
        const c = products.find((p) => p.id === args.id) 
        return c? c : null
    },


    categories : () => categories,

    category : (parent,args,content) => {
        const c = categories.find((p) => p.id === args.id) 
        return c? c : null
    },
},

    Category : {
        products : (parent,args,content) =>{
            const c = products.filter((p) => p.categoryId === parent.id) 
            return c? c : null

            // console.log(parent)
        } 
    },

  Product : {
     category : (parent, args , content) => {
       const c = categories.find((c) => c.id === parent.categoryId )
       return c? c : null 
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



# ............



# In Graphql , we can do multiple nesting 

query {
  products {
    name 
    category {
      name 
      id
      products {
        name 
        category {
          name 
          products {
            name
            category {
              name
            }
          }
        }
      }
    }
  }
}


# the above is posible 





