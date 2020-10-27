import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CourseRepository} from "./courses.repository";
import {CreateCourseDto} from "./dto/create-course.dto";
import {Course} from "./courses.entity";
import {User} from "../users/user.entity";
import {UsersRepository} from "../users/users.repository";
import {CourseComment} from "./comment/course_comment.entity";
import {CourseCommentsRepository} from "./comment/course-comments.repository";
import {CourseImageRepository} from "./image/course-image.repository";
import {CourseImage} from "./image/course-image.entity";
import {CreateCourseImageDto} from "./dto/create-course-image.dto";
import {UpdateCourseDto} from "./dto/update-course-dto";

@Injectable()
export class CoursesService {


  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    @InjectRepository(CourseCommentsRepository)
    private courseCommentRepository: CourseCommentsRepository,
    @InjectRepository(CourseImageRepository)
    private courseImageRepository: CourseImageRepository

  ){}


  getCourseCommentsById(courseId: number) : Promise<CourseComment[]>{
    return this.courseCommentRepository.getCourseCommentsById(courseId);
  }

  getAllCourses(){
    return this.courseRepository.getAllCourses();
  }

  createCourse(createCourseDto : CreateCourseDto){
    return this.courseRepository.createCourse(createCourseDto);
  }

  getCourseById(courseId:number): Promise<Course>{
    return this.courseRepository.getCourseById(courseId);
  }

  async createCourseComment(createCourseCommentDto,userId:number) : Promise<CourseComment> {
    const {courseId,comment} = createCourseCommentDto;
    const course: Course = await this.courseRepository.getCourseById(courseId);
    const user : User = await this.userRepository.getUserById(userId);
    const courseComment: CourseComment = await this.courseCommentRepository.createCourseComment(comment,course,user);
    return courseComment;
  }

  async getImagesByCourseId(courseId:number) : Promise<CourseImage>{
    return this.courseImageRepository.getImageByCourseId(courseId);
  }

  async createCourseImage(createCourseImageDto:CreateCourseImageDto) : Promise<CourseImage>{
    const { courseId,image } = createCourseImageDto;
    const courseImages = await this.courseImageRepository.getImagesByCourseId(courseId);
    if(courseImages.length > 0){
      await this.courseImageRepository.deleteCourseImages(courseImages);
    }
    const course : Course = await this.courseRepository.getCourseById(courseId);
    const result = await this.courseImageRepository.createCourseImage(course,image);
    return result;
  }

  async updateCourse(course:UpdateCourseDto){
    return this.courseRepository.updateCourse(course);
  }

  deleteCourseById(id:number){
    return this.courseRepository.deleteCourseById(id);
  }



}
