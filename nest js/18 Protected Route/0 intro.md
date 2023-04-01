
# 1.... Generate new module for the profile with it's controller , service .....

>nest g module profile
>nest g controller profile



# 2 .... we need to create a JwtStrategy(middleware) which we will use to resolve the user from the accesstoken .... 

# auth/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}

# this is similat to the LocalStrategy as we are extending the PassportStrategy ...
# in the contructor inside the super() we extract the accesstoken from the headers if it's available ...


# 3 ... We need to register the JwtStrategy in the auth.module.ts ... 

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './auth.constants';


import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    controllers: [AuthController],
    imports: [UserModule, PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
    
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
  
})
export class AuthModule {}


# as we have noticed ... we 

imports = takes just modules 
providers = takes services and strategies 
controllers = takes controllers .... 

# 4 .......profile/profile.controller.ts 

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
# ..................
    @UseGuards(AuthGuard('jwt'))
# ..................
    @Get() 
    profile(): any {
        return {message : "I am protected route ... "}
    }
}


# ... Now this works ,.... we can't access the http://localhost:3000/profile unless we provide an access token ....

