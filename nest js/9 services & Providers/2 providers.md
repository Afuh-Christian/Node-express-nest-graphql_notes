# Providers 
-Are fundamental to Nest 

-Providers are plain JS classes that are declared as providers in a module
 e.g in the user.module.ts we have defined the [UserService] as the providers

 -classes such as services , repositories ,or helpers can be treated as providers simply by adding Nest's  `@Injectable()` decorator

 -Providers can be injected into a class through the constructor, and Nest will handle resolving the dependencies , making dependency management extremely easy

 -  
