const { reviews } = require("../db")

exports.Query = {
    hello : (parent,args,{categories}) => "This is mine" , 
    products : (parent,{filter},{products,reviews}) => {
       // const RatingRange = 
        if(filter){
            const {onSale, avgRating} = filter
            if(onSale) {
                const filteredProducts = products.filter((c) => c.onSale === onSale)
                return filteredProducts
            }

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
        
    },

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