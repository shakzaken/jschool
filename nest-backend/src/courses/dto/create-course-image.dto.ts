import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateCourseImageDto {

  @IsNotEmpty()
  image:string;


  @IsNotEmpty()
  courseId:number;
}
