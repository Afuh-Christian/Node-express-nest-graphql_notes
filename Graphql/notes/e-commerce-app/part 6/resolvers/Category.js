

exports.Category = {
    products : (parent,args,{products}) =>{
        const c = products.filter((p) => p.categoryId === parent.id) 
        return c? c : null

        // console.log(parent)
    } 
}