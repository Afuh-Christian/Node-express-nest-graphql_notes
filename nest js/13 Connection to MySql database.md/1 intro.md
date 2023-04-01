# How to connect to database .... 

https://docs.nestjs.com/techniques/database

# NB ... typeORM allows you to write code for database queries that work for all databases ...

# 1 ... Process ....

> npm install --save @nestjs/typeorm typeorm mysql2

# 2 ... app.module.ts 

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
         host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'deLe1017',
      database: 'nestjs',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}


# NB WARNING   ......  Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
- forRoot = Should be accessible in the whole project ....

# 3 ....We need to create a file called entity...

# src/user/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

}

# 4 ... Register this entity in the TypORM inside the list of entities in the app.module.ts

# app.module.ts 

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
# .......
import { User } from './user/user.entity';
# .......
import { UserModule } from './user/user.module';


@Module({
  controllers: [AppController],
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'deLe1017',
      database: 'nestjs',
# .......
      entities: [User],
# .......

      synchronize: true,
    }),
  
  ],
})
export class AppModule {}


# 5 ....Import the TypeORmModule as the imports in the user.module.ts for the feature of  the entity User 

# user.module.ts   

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
# .......
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
# .......
import { UserService } from './user.service';

@Module({
# .......
  imports: [TypeOrmModule.forFeature([User])],
# .......
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}






# 6 .... To Use this we need to inject Repositories .....
# This module uses the forFeature() method to define which repositories are registered in the current scope. With that in place, we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator: 

So we will inject the repository in the user.service.ts and use this to do the database queries .... 
We will use the contructor to get the repository through the entity we have created ..... 

# user.service.ts 

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
    }

# @InjectRepository(User) ... makes usersRepository the type orm for the user ....

the methods availble ..... 
find() 
findOne(id) 
delete(id) 




