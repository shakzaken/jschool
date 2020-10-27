import { Module } from '@nestjs/common';
import { DegreesController } from './degrees.controller';
import { DegreesService } from './degrees.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DegreesRepository} from "./degrees.repository";
import {Degree} from "./degree.entity";
import {Course} from "../courses/courses.entity";
import {DegreeCommentsRepository} from "./comment/degree-comments.repository";
import {DegreeComment} from "./comment/degree-comment.entity";
import {UsersRepository} from "../users/users.repository";
import {User} from "../users/user.entity";
import {DegreeImageRepository} from "./image/degree-image.repository";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {CoursesModule} from "../courses/courses.module";


@Module({
  imports:[UsersModule,CoursesModule,AuthModule,TypeOrmModule.forFeature([DegreesRepository,Degree,Course,UsersRepository,User,Course,DegreeImageRepository,DegreesRepository,DegreeCommentsRepository,DegreeComment])],
  controllers: [DegreesController],
  providers: [DegreesService]
})
export class DegreesModule {}
