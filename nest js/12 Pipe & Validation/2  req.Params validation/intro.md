
# We can use the ParseIntPipe if we know that the Param we recieve will always be a number .... 


# How we can add the pipe for this 
https://docs.nestjs.com/pipes#binding-pipes


# ....code ....
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
# ............






# user.controller.ts .... 



    @Patch("/:userID")
 #   update(@Body() body: CreateUserDto , @Param("userID", ParseIntPipe) userIDentification: {userID:number}):any {
        return this.userService.update(userIDentification, body )
    }
    @Get("/:userID")
#    oneuser(@Param("userID", ParseIntPipe) userIDentification: {userID:number}): any {
        return this.userService.oneuser(userIDentification)
    }
    @Delete("/:userID")
#    delete(@Param("userID", ParseIntPipe) userIDentification: {userID:number}): any {
        return this.userService.oneuser(userIDentification)
    }




# Now if in the route , we pass anything other than a number , we will have an error ..... 





