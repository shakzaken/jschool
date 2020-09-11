import {IsString, MinLength} from "class-validator";

export class CreateDegreeDto {

  @IsString()
  @MinLength(4)
  name:string;

  @IsString()
  @MinLength(6)
  description:string;

}
