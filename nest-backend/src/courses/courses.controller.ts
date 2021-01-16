import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
  UseInterceptors,
  Header,
  UploadedFiles, Put,

} from '@nestjs/common';
import {CoursesService} from "./courses.service";
import {CreateCourseDto} from "./dto/create-course.dto";
import {Course} from "./courses.entity";
import {CreateCourseCommentDto} from "./dto/create-course-comment.dto";
import {CreateCourseImageDto} from "./dto/create-course-image.dto";
import {AuthGuard} from "../auth/auth.guard";
import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {CourseImage} from "./image/course-image.entity";
import {UpdateCourseDto} from "./dto/update-course-dto";
import {DeleteResult} from "typeorm";


@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {

  constructor(
    private coursesService: CoursesService
  ){}

  @Get()
  getCourses(){
    return this.coursesService.getAllCourses();
  }

  @Get("/:id")
  getCourse(@Param() params){
    return this.coursesService.getCourseById(params.id);
  }

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto){
    const course :Course =  await this.coursesService.createCourse(createCourseDto);
    return course;
  }


  @Put()
  async updateCourse(@Body() updateCourseDto: UpdateCourseDto){
    const course = await this.coursesService.updateCourse(updateCourseDto);
    return course;
  }


  @Delete("/:id")
  deleteCourseById(@Param() param){
    return this.coursesService.deleteCourseById(param.id);
  }

  /**
  *** --- Course Images ---
  **/

  @Get("/images/:courseId")
  async getImagesByCourseId(@Param() params){
    const courseImage : CourseImage = await this.coursesService.getImagesByCourseId(params.courseId);
    return courseImage;
  }

  @Post("/images/:courseId")
  @UseInterceptors(FilesInterceptor('files'))
  async createCourseImage(@UploadedFiles() files,@Param() param){

    const courseId : number = parseInt(param.courseId);
    const buffer : Buffer = files[0].buffer;
    const bufferString : string = buffer.toString("base64");
    const createCourseImage : CreateCourseImageDto = {
      image:bufferString,courseId
    };
    const res = await this.coursesService.createCourseImage(createCourseImage);

    return res;
  }

  /**
   *** --- Course Comments ---
   **/

  @Get("/comments/:courseId")
  async getCourseCommentsById(@Param() params){
    return this.coursesService.getCourseCommentsById(params.courseId);
  }

  @Post("/comments")
  async createCourseComment(
      @Body() createCourseCommentDto: CreateCourseCommentDto,
      @Request() request){
    const userId = request.user.id;
    return this.coursesService.createCourseComment(createCourseCommentDto,userId);
  }


  @Delete("/comments/:id")
  deleteCourseComment(@Param() param) : Promise<DeleteResult>{
    return this.coursesService.deleteCourseCommentById(param.id);
  }




}
