import {IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";

export class CreateCourseCommentDto {


  @IsString()
  @MinLength(6)
  comment: string;

  @IsNotEmpty()
  courseId: number;

}
