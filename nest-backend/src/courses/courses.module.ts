import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseRepository} from "./courses.repository";
import {User} from "../users/user.entity";
import {UsersRepository} from "../users/users.repository";
import {CourseComment} from "./comment/course_comment.entity";
import {CourseCommentsRepository} from "./comment/course-comments.repository";
import {CourseImage} from "./image/course-image.entity";
import {CourseImageRepository} from "./image/course-image.repository";

@Module({
  imports: [TypeOrmModule.forFeature([
    CourseRepository,User,UsersRepository,
    CourseImage,CourseImageRepository,
    CourseComment,CourseCommentsRepository])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}


