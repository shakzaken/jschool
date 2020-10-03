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
  UploadedFiles,

} from '@nestjs/common';
import {CoursesService} from "./courses.service";
import {CreateCourseDto} from "./dto/create-course.dto";
import {Course} from "./courses.entity";
import {CreateCourseCommentDto} from "./dto/create-course-comment.dto";
import {CreateCourseImageDto} from "./dto/create-course-image.dto";
import {AuthGuard} from "../auth/auth.guard";
import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {CourseImage} from "./image/course-image.entity";


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


  @Get("/comments/:courseId")
  async getCourseCommentsById(@Param() params){
    return this.coursesService.getCourseCommentsById(params.courseId);
  }

  @Get("/images/:courseId")
  async getImagesByCourseId(@Param() params){
    const courseImage : CourseImage = await this.coursesService.getImagesByCourseId(params.courseId);
    return courseImage;
  }


  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto){
    const course :Course =  await this.coursesService.createCourse(createCourseDto);
    return course;
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


  @Post("/comments")
  async createCourseComment(
      @Body() createCourseCommentDto: CreateCourseCommentDto,
      @Request() request){
    const userId = request.user.id;
    return this.coursesService.createCourseComment(createCourseCommentDto,userId);

  }

  @Delete("/:id")
  deleteCourseById(@Param() param){
    return this.coursesService.deleteCourseById(param.id);
  }




}
