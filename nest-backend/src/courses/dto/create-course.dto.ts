import {MinLength,IsString} from "class-validator";


export class CreateCourseDto {

  @IsString()
  @MinLength(4)
  name:string;

  @IsString()
  @MinLength(10)
  description:string;
}

