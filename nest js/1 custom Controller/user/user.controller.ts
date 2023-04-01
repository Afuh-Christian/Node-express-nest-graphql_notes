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