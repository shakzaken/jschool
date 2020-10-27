import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  UseInterceptors,
  UploadedFiles, Put
} from '@nestjs/common';
import {DegreesService} from "./degrees.service";
import {CreateDegreeDto} from "./dto/createDegreeDto";
import {Degree} from "./degree.entity";
import {CreateDegreeCommentDto} from "./dto/create-degree-comment.dto";
import {CreateDegreeImageDto} from "./dto/create-degree-image.dto";
import {AuthGuard} from "../auth/auth.guard";
import {FilesInterceptor} from "@nestjs/platform-express";
import {CreateCourseImageDto} from "../courses/dto/create-course-image.dto";
import {UpdateDegreeDto} from "./dto/update-degree-dto";
import {AddCourseDegreeDto} from "./dto/add-course-degree.dto";


@UseGuards(AuthGuard)
@Controller('degrees')
export class DegreesController {


  constructor(
    private degreesService : DegreesService
  ){}

  @Get()
  getDegrees() : Promise<Degree[]>{
    return this.degreesService.getAllDegrees();
  }
  @Get("/images")
  getDegreesWithImage() : Promise<Degree[]>{
    return this.degreesService.getAllDegreesWithImage();
  }

  @Get("/:id")
  getFullDegree(@Param() param){
    return this.degreesService.getDegreeWithCoursesAndComments(param.id);
  }

  @Get("/comments/:degreeId")
  getDegreeComments(@Param() param){
    return this.degreesService.getDegreeCommentsById(param.degreeId);
  }

  @Get("/images/:degreeId")
  getDegreeImagesById(@Param() param){
    return this.degreesService.getDegreeImagesById(param.degreeId);
  }


  @Post("/images/:degreeId")
  @UseInterceptors(FilesInterceptor('files'))
  async createDegreeImage(@UploadedFiles() files,@Param() param){

    const degreeId : number = parseInt(param.degreeId);
    const images : string[] = files.map(file => {
      return file.buffer.toString("base64");
    });
    const createDegreeImageDto : CreateDegreeImageDto = {
      images:images,degreeId
    };
    const res = await this.degreesService.createDegreeImages(createDegreeImageDto);

    return res;
  }


  @Put()
  updateDegree(@Body() updateDegreeDto: UpdateDegreeDto){
    return this.degreesService.updateDegree(updateDegreeDto);
  }

  @Post()
  createDegree(
    @Body() createDegreeDto : CreateDegreeDto) : Promise<Degree>{
    return this.degreesService.createDegree(createDegreeDto);
  }

  @Post("/courses")
  addCourseToDegree(@Body() addCourseDegreeDto:AddCourseDegreeDto) : Promise<Degree>{
    return this.degreesService.addCourseToDegree(addCourseDegreeDto);
  }

  @Post("/comments")
  createDegreeComment(
    @Body() createDegreeCommentsDto: CreateDegreeCommentDto,
    @Request() req ){
      const userId = req.user.id;
      return this.degreesService.createDegreeComment(createDegreeCommentsDto,userId);
  }


  @Delete("/:id")
  deleteDegreeById(@Param() param){
    return this.degreesService.deleteDegreeById(param.id);
  }


}
