# Main Components of nest js 

-controllers 
-providers 
-modules 


# nest-cli.json 
When you run the command to create a module ,provider , controller etc ... 
It will be created in the src directory ... 



# test/jest-e2e.json ..
Uses the jest framework for testing .... 



# src/main.ts ............................................................................................

1 - we listern for the server , 
2 - we create an instance of the NestFactory and we pass the AppModule ..

# .....
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
# .....

# src/app.module.ts  ............................................................................................................
1 @Module({}) makes the AppModule class a module .. 
2 Add the controllers and providers 
  controllers: [AppController],
  providers: [AppService],

# .....
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

# .....


# src/app.controller.ts  ........................................................................................

1 @Controller() makes the class a controller 

2 Use dependency injection to inject the service ..
 constructor(private readonly appService: AppService) {}

# .....
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
# .....


# src/app.service.ts .......................................................................................................................................

1 @Injectable() ... makes it to perform dependency injection .... 



# ........
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

# ........




# NB .... All these decorators add metadata to a class and that metadata defines the perpose of that class .... 




# we have the src/app.controller.spec.ts  
    -for testing file for the controller ..... 













# for the firt example ... 

# src/app.controller.ts 

@Get()  ... is an http method .... 

and  we get the getHello() from the injected service ..... 







# NB .. @Module , @Controller , @Injectable , @Get , @Post ,@Put , @Delete  .........    are all imported from      "nestjs/common" 