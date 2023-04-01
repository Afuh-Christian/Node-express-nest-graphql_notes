# we want to be able to filter our query base of some of its attributs 

# 
query{
    products(filter:{
        onSale:true
    }){
        name 
        description 
    }

}
# 

        -what we can filter by is passed as a parameter within the filter object .... 




# Befor we have been working with scalar params , here we will need to use an object params



# We need to define the object before passing in the params 


# full codee ........ 

# schema.js 
const { gql } = require("apollo-server")


exports.typeDefs = gql`
type Query{
     hello:String
# ............
     products(filter: ProductsFilterInput): [Product!]!
     product(id: ID): Product!
# ............

     categories: [Category!]!
     category(id: ID): Category!   
 }
# ............
input ProductsFilterInput{
    onSale:Boolean
}
# ............


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

# ............

# Query.js 


exports.Query = {
    hello : (parent,args,{categories}) => "This is mine" , 
# .............
    products : (parent,{filter},{products}) => {
        if(filter){
        const filteredProducts = products.filter((c) => c.onSale === filter.onSale)
            return filteredProducts?  filteredProducts : null 
    }else{
        return products
        }
    },
# .............

    product : (parent,args,{products}) => {
        const c = products.find((p) => p.id === args.id) 
        return c? c : null
    },
    categories : (parent,args,{categories}) => categories,
    category : (parent,args,{categories}) => {
        const c = categories.find((p) => p.id === args.id) 
        return c? c : null
    },
}

# .............

# end code ...................
# 
# client side 

query {
products (filter: {
  onSale:false
} )  {
  name  
  price
  description
  onSale
}
}

# ..........



# for us to be able to filter the products within a category , we also have to set it explicitly because they have their own schemas and resovers for it 

# schema.js 



input ProductsFilterInput{
    onSale:Boolean
}

 type Category{
     id:ID! 
     name:String!
     products(filter: ProductsFilterInput): [Product!]!
 }



# Category.js 

   products : (parent,{filter},{products}) =>{
        const catproducts = products.filter((p) => p.categoryId === parent.id) 
        if(filter){
            const filteredProducts = catproducts.filter((c) => c.onSale === filter.onSale)
                return filteredProducts?  filteredProducts : null 
        }else{
            return catproducts? catproducts : null
            }
    } 


# client demand ex

query {

category(id:"c01b1ff4-f894-4ef2-b27a-22aacc2fca70") {
  products (filter: {
  onSale:false
} )  {
  name 
  onSale 
  
}
}

}

# ....













# ....................Filter by avgRating .............................

# 5 
# 4 or greater 
# 3 or greater 
# 2 or greater 
# 1 or greater 


# avgRating is not present at the moment

# schema 

type Query{
     hello:String
     products(filter: ProductsFilterInput): [Product!]!
     product(id: ID): Product!

     categories: [Category!]!
     category(id: ID): Category!   
 }

input ProductsFilterInput{
    onSale:Boolean
# ........
    avgRating: Int
# ........
}
# ........


# Query.js

  products : (parent,{filter},{products,reviews}) => {
       // const RatingRange = 
        if(filter){
            const {onSale, avgRating} = filter
            if(onSale) {
                const filteredProducts = products.filter((c) => c.onSale === onSale)
                return filteredProducts
            }
# ...............
            if([1,2,3,4,5].includes(avgRating)){
                const fproductsbyRange = []
                products = products.filter((product) => {
                    let sumRatin = 0 ; 
                    let numbberofreviews = 0 ;
                    reviews.forEach((review) => {
                        if(review.productId === product.id) {
                            sumRatin += review.rating
                            numbberofreviews++
                        }
                    })
                    const avgPrdoductRating = sumRatin/numbberofreviews

                    return avgPrdoductRating > avgRating
                })

            }         
    }
    
        return products
# ...............
        
    },
# .........

