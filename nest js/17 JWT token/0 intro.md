# We need to generate access token ... 

# Generally in api's we need accessTokens to access protected routes ....... 

https://docs.nestjs.com/security/authentication#jwt-functionality

# 1 ..... Install both ... 

> npm install --save @nestjs/jwt passport-jwt
> npm install --save-dev @types/passport-jwt


# 2 .... Inject the JwtService in the AuthService  

# auth/auth.service.ts  

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userSerivce: UserService,
# ............
        private jwtService : JwtService
# ............
    ) { }
  
    async validateUser(loginDto:any){
        const user = await  this.userSerivce.findbyEmail(loginDto.email) 
        
        if (user && user.password === loginDto.password ) {
                return user  
        }
        return null
    }
}


# 3 ....We will create a function in the auth.serivce that recieves the user object as paramter an then use it to generate an access token ..... 
# this function is created in the AuthService because it can be used in the LocalStrategy directly and that's where our data lies ....
# we can still call this function in the AuthController  if we wish to .. ..... 


# auth.services.ts 

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userSerivce: UserService,
        private jwtService: JwtService,
    ) { }
  
    async validateUser(loginDto:any){
        const user = await  this.userSerivce.findbyEmail(loginDto.email) 
        
        if (user && user.password === loginDto.password ) {
                return user  
        }
        return null
    }
# ...............
    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
# ...............
}


# 4 .... WE need to create the Jwt secrete constant ..... eg in the .env file .... if you wish ...

# auth.constants.ts 

export const jwtConstants = {
    secret: 'secretKey',
  };



# 5 ...Now we go to the auth module and register the JwtModule there ... along with the secreate key we defined and  the expire time ...

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './auth.constants';


import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
    controllers: [AuthController],
# ...............
    imports: [UserModule, PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
    ],
# ...............
    providers: [AuthService, LocalStrategy],
  
})
export class AuthModule {}


# 6 .... Now we have to use this in the AuthController .......

import { Body, Controller, Post } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';


import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req:any){
# .......... the login functions from the AuthService returns the accessToken .............
       return this.authService.login(req.user)
# ....................
    }
}


# ..... so the process is .... 
data flows from ....

Controller - > ControllerMiddleware(LocalStrategy) - > AuthService - > ControllerMiddleware(LocalStrategy) - > Controller function 




















