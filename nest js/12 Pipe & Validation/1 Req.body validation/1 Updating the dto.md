# we now change the CreateUserDto to this ..


import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}


# others 
 IsString() 
 validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
IsDate,
  @IsFQDN, 


# these are all validators .... ... 


import { IsEmail ,  IsString  } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}



# THis works now ... but the only problem is we can still recieve an extra unknown field when submitting the data and we do not want that ..... 