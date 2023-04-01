# GraphQL

- It's a query language that gives the client power to as for exactly what they need

# advantages

-prevents over-fetching
-prevent under-fetching

# ..................HOW IT PREVENTS OVER-FETCHING .....................

# ... Instead of hitting a particular endpoint

-we define the set of data we want to get back

# ... notation

# Let's query products

    query{
        products{
            name,
            image
        }
    }

    -Means we want to query the products , but we are getting just the name name image property of each product

# Particular product

    query{
        product(id:1){
            name ,
            image ,
            description ,
            price
        }
    }

# ......................HOW IT PREVENTS UNDER-FECTHING ...............

-instead of having two sepearate routes to get products and categories
(products and nested the the category )

-we can rather do this

# ... notation

# category -> one to many -> products

    query{
        category(id:1){
            name,
            products{
                name,
                image
            }
        }
    }

-Get a category and all products under it

# if we had ......

    query{
        product(id:1){
            name,
            image
            category{
                name

            }
        }
    }

-Get a product and it's mother category

# This is called graphQL because we are relating multiple data inside of a graph and we are querying the data through that graph

# .... Let's code out a graphQL api

-github repo for all the code .... https://github.com/harblaith7/GraphQL-Course-Udemy

We will use js and node for this ....

# ...................... To auto-restart server on text change..............................................

-npm install nodemon -g

# in package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev" : "nodemon index"
}

-npm run dev

# .............................................................................................................



