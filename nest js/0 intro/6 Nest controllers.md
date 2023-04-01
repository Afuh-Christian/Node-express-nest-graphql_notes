
# A controller's purpose

- To receive specific requests for the application

- Then handles the request and returns the appropriate response .. 

- we can also sent the route here .... (enpoint ... )

# we want  Hello world to be displayed at    ..... http://localhost:3000/user/ 

we will place the endpoint in the @Get("/user")


# .....
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
#    @Get("/user") 
    a(): string{
        return "Hello Word"
     }
 }
# .....



 

 # we can define the mother route in the @Controller() ..... and any other route created in the controller class will come after it .....  ....

# .... 

# @Controller("user")
export class AppController {
#    @Get("/chris") 
    a(): string{
        return "Hello Chris"
     }
#    @Get("/boris") 
    b(): string{
        return "Hello Boris"
     }
 }
# .... 



Now to access a() .... /user/chris  ..
Now to access b() .... /user/boris  ..

we can have more methods ....



#  ....................@Post()  .... for storing data .....

.. To send a @Post() ... it needs to be explicite .. so we will need a real client ...(postman , thunder client etc ...)

...




