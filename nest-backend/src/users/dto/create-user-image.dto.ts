import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateUserImageDto {

  @IsNotEmpty()
  image:string;


  @IsNotEmpty()
  userId:number;
}
