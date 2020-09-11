import {EntityRepository,Repository} from "typeorm";
import {Course} from "../courses.entity";
import {CreateCourseDto} from "../dto/create-course.dto";
import {} from "@nestjs/typeorm";
import {CreateCourseCommentDto} from "../dto/create-course-comment.dto";
import {User} from "../../users/user.entity";
import {CourseComment} from "./course_comment.entity";


@EntityRepository(CourseComment)
export class CourseCommentsRepository extends Repository<CourseComment> {




  async createCourseComment(comment: string ,course:Course ,user:User) : Promise<CourseComment> {
    const courseComments = new CourseComment();
    courseComments.comment = comment;
    courseComments.user = user;
    courseComments.course = course;
    courseComments.date = new Date();

    const result : CourseComment = await this.save(courseComments);
    return result;

  }


  async getCourseCommentsById(courseId:number) : Promise<CourseComment[]>{
    return this.find({where:{courseId:courseId}});
  }



}
