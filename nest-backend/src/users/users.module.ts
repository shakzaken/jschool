import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UsersRepository} from "./users.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseComment} from "../courses/comment/course_comment.entity";
import {UserImage} from "./images/user-image.entity";
import {UserImageRepository} from "./images/user-image.repository";

@Module({
  imports:[TypeOrmModule.forFeature([UsersRepository,CourseComment,UserImage,UserImageRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
