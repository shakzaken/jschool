import {IsNotEmpty,IsString} from "class-validator";

export class CreateUserImageDto {


  @IsNotEmpty()
  userId:number;

  @IsString()
  @IsNotEmpty()
  image:string;
}
