# this is the most important part of any web app .... 

# How to set up the Auth system  in nest js .... 
https://docs.nestjs.com/security/authentication


# 1 .. Update the entity and dto  ... add password field ...




# 2 ... Create a login route .... 

generate a new controller ... AuthController .....

>nest g controller Auth 

>nest g module Auth   

register this controller in the Auth Module and register the Auth Module in the AppModule

# src/app.module.ts

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
      entities: [User],
      synchronize: true,
    }),
# ......
    AuthModule,
# ......
  ],
})
export class AppModule {}


# src/auth/auth.module.ts

@Module({
# .........
    controllers: [AuthController],
# ......... 
    imports : [UserModule],
})
export class AuthModule {}


# 2 ... We will be using the userRepository => using the user.service.ts and not creating a new one ....

So we will inject the UserService in the AuthController ..... and use it's methods .. .... 



# 3 ... this won't work if we do not register this service in the AuthModule ... 

register the UserService in the AuthModule ...... 

# i src/auth/user.module.ts 
export the user service 

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
# .....
  exports: [UserService]
# .....
})
export class UserModule {}


# src/auth/auth.module.ts 
import the UserModule ... and since the UserService was the only thing imported ... it will apply it in the AuthModule ..

@Module({
    controllers: [AuthController], 
# .....
    imports : [UserModule],
# .....
})
export class AuthModule {}


# 4 ..........................................









