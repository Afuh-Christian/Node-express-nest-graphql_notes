# ........Crud ..

NB .... {a} === {a : a}

find() = all items
findOne({where : {id : param}}) = One item
save(item) = Add item
update(id , itemupdate) = Update item > does not return an item so also doesn't return a promise
delete(id) = delete item > does not return an item so also doesn't return a promise

we had already set how the data will look like ...... in the user.controller.ts ...

# src/user/user.service.ts ...

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
constructor(
@InjectRepository(User)
private usersRepository: Repository<User>,
){}
get(): Promise<User[]> {
return this.usersRepository.find()
}

    create(newuser: CreateUserDto): Promise<User> {
        return this.usersRepository.save(newuser)
    }

    update(id: number, itemupdate: CreateUserDto) : any {
        return  this.usersRepository.update( id , itemupdate)
    }

    GetOneUser(id: number): Promise<User> {
        return  this.usersRepository.findOne({where : {id}})
    }

    deleteOne(id: number): any {
        return this.usersRepository.delete(id)
    }

}

# user.controller.ts

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
