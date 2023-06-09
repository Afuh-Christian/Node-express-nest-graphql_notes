import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(private userSerivce: UserService) { }
    @Post('/login')
    async login(@Body() loginDto:any){
        const user = await  this.userSerivce.findbyEmail(loginDto.email) 
        
        if (user) {
            if (user.password === loginDto.password) {
                return user
            } else {
                return "Password do not match"
            }
        }
        return "Not found"
    }
}






