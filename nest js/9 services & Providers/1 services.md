# user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {}

# ....  user.module.ts
@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}




# funtions of the services .......

- Handles fetching data from the database ..
- Provides all the buisness logic to the controller ..