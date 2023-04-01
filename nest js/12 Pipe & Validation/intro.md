# Using built in validation types ... 

https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe

>npm i --save class-validator class-transformer

- To add this pipe globally .... 

# src/main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
#  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();




# Pipes  .. contains an @Injectable() ................................................................................
-tranform input data to the required form 
-validates the data 

https://docs.nestjs.com/pipes

# built in pipes ... 
https://docs.nestjs.com/pipes#built-in-pipes