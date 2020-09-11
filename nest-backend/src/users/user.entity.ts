import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany , Unique} from "typeorm";
import {CourseComment} from "../courses/comment/course_comment.entity";
import {DegreeComment} from "../degrees/comment/degree-comment.entity";
import {} from "class-validator";


@Entity()
@Unique(["email"])
export class User {


  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password:string;


  @OneToMany(type => CourseComment, courseComment => courseComment.user)
  courseComments: CourseComment[];

  @OneToMany(type => DegreeComment, degreeComment => degreeComment.user)
  degreeComments: DegreeComment[];
}
