

# ... @Body  === req.body 

@Body() from 'nestjs/common'


.... this means it's return type will be an object ..... 




# user.controller.ts
  @Post()
    create(@Body() body: any): any {
        return this.userService.create(body)
    }

# user.services.ts
   create(body: any): any {
        return body
    }


# NB ...we need to  the body to return the exact type we need ..... so we create a dto(data )

https://docs.nestjs.com/controllers#request-payloads


# dto/create-user.dto.ts

export class CreateUserDto  {
    country: string;
    name: string;
}


# import as the type in the user.services.ts & user.controller.ts  os the type of the body ...

# user.controller.ts
   @Post()
    create(@Body() body: CreateUserDto): any {
        return this.userService.create(body)
    }


# user.services.ts
    create(body: CreateUserDto): any {
        return body
    }




# ... for now it's still acceptes any object we send .... 
# we will cover validation so restrictions can be make to the data type and fields that a allowed in the post and patch request ..