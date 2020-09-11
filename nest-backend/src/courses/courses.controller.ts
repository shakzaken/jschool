import {Controller, Get, Post, Body, Param, UseGuards, Request} from '@nestjs/common';
import {CoursesService} from "./courses.service";
import {CreateCourseDto} from "./dto/create-course.dto";
import {Course} from "./courses.entity";
import {CreateCourseCommentDto} from "./dto/create-course-comment.dto";
import {CourseComment} from "./comment/course_comment.entity";
import {CreateCourseImageDto} from "./dto/create-course-image.dto";
import {AuthGuard} from "../auth/auth.guard";


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
  async getCourseImagesById(@Param() params){
    return this.coursesService.getCourseImagesById(params.courseId);
  }


  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto){
    const course :Course =  await this.coursesService.createCourse(createCourseDto);
    return course;
  }

  @Post("/images")
  async createCourseImage(@Body() createCourseImage: CreateCourseImageDto){
    return this.coursesService.createCourseImage(createCourseImage);
  }


  @Post("/comments")
  async createCourseComment(
      @Body() createCourseCommentDto: CreateCourseCommentDto,
      @Request() request){
    const userId = request.user.id;
    return this.coursesService.createCourseComment(createCourseCommentDto,userId);

  }




}
