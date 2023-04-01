import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {

    @UseGuards(AuthGuard('jwt'))
    @Get() 
    profile(): any {
        return {message : "I am protected route ... "}
    }
}
