import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    a(): string {
        return this.userService.a()
    }
    @Post()
    create(@Body() body: CreateUserDto): any {
        return this.userService.create(body)
    }

    @Patch("/:userID")
    update(@Body() body: CreateUserDto , @Param("userID", ParseIntPipe) userIDentification: number): any {
        return this.userService.update(userIDentification, body)
    }
    @Get("/:userID")
    oneuser(@Param("userID", ParseIntPipe) userIDentification: number): number {
        return this.userService.oneuser(userIDentification)
    }
    @Delete("/:userID")
    delete(@Param("userID", ParseIntPipe) userIDentification:number):number{
        return this.userService.oneuser(userIDentification)
    }
}


   

  

