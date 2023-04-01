# 50 :  00 :  00 


The AppController can't be responsible for handling all the routes ... we should a create a controller for all the "/user" routes ..... 

# create new folder src/user/user.controller.ts
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

# app.module.ts 

@Module({
    controllers: [AppController , UserController]
})
export class AppModule {
}

# We can register this controller directly into the app.module.ts but it would rather be advisable for use to create a new module for the user and then rather register this module in the app.module.ts 

# Now we won't need to import the service for the user.controller inside the app.module ... we can do this in the app.module.ts ...... the user module handles everything happening in the user.controller and user.service ... the app.module just needs the user.module ...

