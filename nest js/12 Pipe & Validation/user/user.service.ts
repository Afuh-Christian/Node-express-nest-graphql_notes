import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
    a(): string {
        return "Heu .....dadfafasdadfa"
    }

    create(body: CreateUserDto): any {
        return body
    }

    update(param: number, body: CreateUserDto) : any {
        return { body: body,  param : { param } }
    }
    
    oneuser(param: number): number {
        return  param 
    
    }


}
