
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique} from "typeorm";
import {CourseComment} from "./comment/course_comment.entity";
import {CourseImage} from "./image/course-image.entity";


@Entity()
@Unique(["name"])
export class Course {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => CourseComment, courseComment => courseComment.course)
  courseComments: CourseComment[];

  @OneToMany(type => CourseImage, courseImage => courseImage.course)
  courseImages: CourseImage[];

}
