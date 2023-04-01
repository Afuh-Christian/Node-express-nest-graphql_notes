
# Implementing Passport local#
Now we can implement our Passport local authentication strategy. Create a file called local.strategy.ts in the auth folder, and add the following code:

https://docs.nestjs.com/security/authentication#implementing-passport-local


# 1 Strategy  ..... Local passport 
It checks for the user validation 

# /auth/local.strategy.ts 

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
# ...................................................
    super({usernameField : "email"});
  }

    async validate(email:string , password: string): Promise<any> {
# ...................................................   
    const user = await this.authService.validateUser({email, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}


# For now this is not implemented ... because when we send a wrong password or email it actually returns null .... and not the  UnauthorizedException(); in the LocalStrategy ........


# 2 .... we need to tell nest js that when ever we visit the /login route ... the Local.Strategy should be applied also  .... 
# since everything concerning this route is in the auth.module.ts ... we need not disturb the app.module.ts 

# auth.module.ts .. 

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
# ............
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
# ............
})
export class AuthModule {}


# 3 ... We need to use the built in gaurds in the auth.controllers.ts ...... 

# auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
# ..........
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';
# ..........

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }
# ..........
    @UseGuards(AuthGuard('local'))
# ..........
    @Post('/login')
    async login(@Body() loginDto:any){
       return  this.authService.validateUser(loginDto)
    }
}


# Theres a small problem we get  the error we wanted ..but now it gives us an error even if we have the correct data ... 

# LocalStrategy is versed with username ... but we are validate with the email rather ... so we have to set this explicitely to the parent class of the LocalStrategy class ... that the usernameField will be the email ... 

# 4  .... allter the parent class of the LocalStrategy ......

# auth/local.strategy.ts



import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
# .........the validate function is just for validation so the names of the parameters that need to be validated should be passed ... validate() does not accept objects  ... default paramters are username & password ............................................since the parameters we sent were email and password ... we had to change the  name of the default usernameField from "username" to "email" explicitly ... .......
    super({usernameField : "email"});
  }

    async validate(email:string , password: string): Promise<any> {
# ...................................................   
    const user = await this.authService.validateUser({email, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}


# 5 .... Clean the auth.controller.ts .... 
we do not need to access the AuthService for the user because it's already being handled by the LocalStrategy and validation is done there .... ....


# ..when we access the /login  it first visits the LocalStorage (validation is done there  before we access the login function in the AuthController .) .... this seems confusing ...take lots of time on it .... 

  @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() loginDto:any){
       return  loginDto
    }



# NB ... this works like a middleware .... 


# 6 ...... When we use the LocalStorage ... it automatically creates a user object in the req   .... So we can call this user object .... (this user object is exactly like it was in the database ... as if it was the return of the validateUser() from the AuthService   that was used in the localStrategy.... )



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
# ...............
    async login(@Request() req:any){
       return  req.user
    }
# ...............
}











