# let's do some crud ..... 
# NB .... Database query normally take time So they return a promise .... example ...

Promise<User[]> .... the database is promising that it will return an array of user .... even though it may delay abit ....


# ....................................................................................
# ....................................................................................
# ....................................................................................



# Get all items ...... 

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
# ...............
    get(): Promise<User[]> {
        return this.usersRepository.find()
    }
# ...............

}


