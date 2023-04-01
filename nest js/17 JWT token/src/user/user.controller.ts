import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { Observable } from "rxjs";
import { CreateUserDto } from "./dto/user-create.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    get(): Promise<User[]> {
        return this.userService.get()
    }

    @Get("/:userID")
    findoneuser(@Param("userID", ParseIntPipe) userIDentification: number): Promise<User> {
        return this.userService.GetOneUser(userIDentification)
    }

    @Post()
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.userService.create(body)
    }

    @Patch("/:userID")
    update(@Body() body: CreateUserDto , @Param("userID", ParseIntPipe) userIDentification: number): any {
        return this.userService.update(userIDentification, body)
    }
   
    @Delete("/:userID")
    delete(@Param("userID", ParseIntPipe) userIDentification:number):any {
        return this.userService.deleteOne(userIDentification)
    }
}


   

  

