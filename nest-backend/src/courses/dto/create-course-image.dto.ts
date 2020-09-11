import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateCourseImageDto {

  @IsNotEmpty()
  @IsString()
  image:string;


  @IsNotEmpty()
  courseId:number;
}
