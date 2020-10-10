import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateDegreeImageDto {

  @IsNotEmpty()
  images:string[];


  @IsNotEmpty()
  degreeId:number;
}
