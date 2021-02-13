import {Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Course} from "../courses.entity";

@Entity()
export class CourseImage {

  @PrimaryGeneratedColumn()
  id:number;


  @Column("mediumtext")
  image: string;


  @ManyToOne(type => Course,{onDelete: 'CASCADE' })
  course: Course;

  @Column()
  courseId:number;


}
