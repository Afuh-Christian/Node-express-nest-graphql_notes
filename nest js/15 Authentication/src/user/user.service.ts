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

    // functions for login controller .. 
    findbyEmail(email: string): any {
        return  this.usersRepository.findOne({ where: { email } })
    }



}
