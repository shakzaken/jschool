import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateDegreeImageDto {

  @IsString()
  image:string;

  @IsNotEmpty()
  @IsNumber()
  degreeId:number;

}
