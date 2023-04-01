# The authentication we just did was a rough auth ..... 



# we will use the Passport Auth .... 
https://docs.nestjs.com/security/authentication#authentication




# 1 .... Intstall both... ....................................................................................

> npm install --save @nestjs/passport passport passport-local
> npm install --save-dev @types/passport-local

# 2 ... create auth.service.ts ....................................................................................

We will do the buisness logic in here rather than in the controllers .... 
so we will inject the UserService in the AuthService ...
call it's functions and apply the buisness logic on them before sending to the controllers .... 

# auth.service.ts 

Injecting the user.service and applying logic ....
this will work since we had exported the UserService from the UserModule and imported in the AuthModule ......


# ..... 
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userSerivce: UserService) { }
  
    async validateUser(loginDto:any){
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

# .....


# auth.controller.ts .... 

injecting the authService  ...... 

# .....
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }
    @Post('/login')
    async login(@Body() loginDto:any){
       return  this.authService.validateUser(loginDto)
    }
}
# .....

# 3 ....................................................................................


