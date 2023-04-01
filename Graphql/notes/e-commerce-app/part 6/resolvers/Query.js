
exports.Query = {
    hello : (parent,args,{categories}) => "This is mine" , 
    products : (parent,args,{products}) => products,

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