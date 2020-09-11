import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Course} from "./courses/courses.entity";
import { UsersModule } from './users/users.module';
import { DegreesModule } from './degrees/degrees.module';
import {User} from "./users/user.entity";
import {Degree} from "./degrees/degree.entity";
import {CourseComment} from "./courses/comment/course_comment.entity";
import {DegreeComment} from "./degrees/comment/degree-comment.entity";
import {CourseImage} from "./courses/image/course-image.entity";
import {DegreeImage} from "./degrees/image/degree-image.entity";
import {UserImage} from "./users/images/user-image.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password:"1234",
      database: "jschool",
      entities: [User,Course,CourseComment,CourseImage,
                  Degree,DegreeComment,DegreeImage,UserImage],
      synchronize: true
    }),
    UsersModule,
    DegreesModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
