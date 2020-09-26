import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateCourseImageDto {

  @IsNotEmpty()
  image:Buffer;


  @IsNotEmpty()
  courseId:number;
}
