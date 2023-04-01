

# auth.controller.ts 


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


# NB .... trying to return an async function gave me errors ..... I don't know why .... 


async -- > function returns -- > Promise<any>





