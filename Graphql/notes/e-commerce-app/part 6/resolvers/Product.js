


exports.Product = {
    category : (parent, args , {categories}) => {
      const c = categories.find((c) => c.id === parent.categoryId )
      return c? c : null 
     }
 }

