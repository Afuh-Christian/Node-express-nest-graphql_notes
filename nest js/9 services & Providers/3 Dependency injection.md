# create a logic in the service and then call in the controller .....  .. 

# user.service.ts
 @Injectable()
export class UserService {
    a(): string {
        return "Heu .....dadfafasdadfa"
    }
}
# user.controller.ts 

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    a(): string{
        return this.userService.a()
    }
}

# ..................................................................................
# ..................................................................................
# ..................................................................................
# ..................................................................................