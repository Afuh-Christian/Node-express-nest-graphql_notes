
# delete the 
controller , 
provider(service) 
module 

and their respective imports in other files like in the main.ts 



# Definition .... 

A module is a class annotated with a @Module() decorator . 

Each application has a root module , which Nest uses as  a starting point to resolve the application's structure and relationships .. 

It's highly recommended to use multiple modules to organize your application components .. 

The @Module() decorator provides metadata that Nest makes use of to organize the application structure .. 

In the AppModule ... we need to register other modules  of the  project inside .. 