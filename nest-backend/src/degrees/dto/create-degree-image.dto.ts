import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateDegreeImageDto {

  @IsNotEmpty()
  image:string;


  @IsNotEmpty()
  degreeId:number;
}
