import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateDegreeCommentDto {

  @IsNotEmpty()
  degreeId: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

}
