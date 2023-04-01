import { Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    a(): string {
        return this.userService.a()
    }
    @Post()
    create(@Req() req: Request): any {
        return this.userService.create(req)
    }

    @Patch("/:userID")
    update(@Req() req: Request , @Param() userIDentification: {userID:number}):any {
        return this.userService.update(userIDentification, req )
    }
    @Get("/:userID")
    oneuser(@Param() userIDentification: {userID:number}): any {
        return this.userService.oneuser(userIDentification)
    }
    @Delete("/:userID")
    delete(@Param() userIDentification: {userID:number}): any {
        return this.userService.oneuser(userIDentification)
    }
}


   

  

