

exports.Category = {
    products : (parent,{filter},{products}) =>{
        const catproducts = products.filter((p) => p.categoryId === parent.id) 
        if(filter){
            const filteredProducts = catproducts.filter((c) => c.onSale === filter.onSale)
                return filteredProducts?  filteredProducts : null 
        }else{
            return catproducts? catproducts : null
            }
    } 
}