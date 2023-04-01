# We will regiter the user controller in the user module and the register the user module in the app module(root module)  .........................................................................................................................................................................................................................................................................


# user.controller.ts
import { Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";


@Controller("/user")
export class UserController { 
    @Get()
    a(): string{
        return "Heu .....dadfafasdadfa"
    }
    @Post()
    create(@Req() req: Request):any {
        return req.body
    }
    @Patch("/:userID")
    update(@Req() req: Request , @Param() userIDentification: {userID:number}):any {
        return { ...req.body, ...userIDentification }
    }

    @Get("/:userID")
    oneuser(@Param() userIDentification: {userID:number}): any {
        return userIDentification
    }
    @Delete("/:userID")
    delete(@Param() userIDentification: {userID:number}): any {
        return userIDentification
    }
}
# user.module.ts
@Module({
    controllers:[UserController]
})
export class UserModule{}
# app.module.ts
@Module({
    controllers: [AppController],
    imports : [UserModule]
    
})
export class AppModule {}




# We can still improve on what we have and we can also do it very fast .... using nest cli






