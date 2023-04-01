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
       return  req.user
    }
}

