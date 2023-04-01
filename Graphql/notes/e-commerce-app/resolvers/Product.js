


exports.Product = {
    category : (parent, args , {categories}) => {
      const c = categories.find((c) => c.id === parent.categoryId )
      return c? c : null 
     },
     reviews : (parent,args,{reviews}) => {
       const c = reviews.filter((c) => c.productId === parent.id)
       return c? c : null 
      }
     
 }

