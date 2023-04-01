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

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
