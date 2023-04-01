import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userSerivce: UserService) { }
  
    async validateUser(loginDto:any){
        const user = await  this.userSerivce.findbyEmail(loginDto.email) 
        
        if (user && user.password === loginDto.password ) {
                return user  
        }
        return null
    }
}
