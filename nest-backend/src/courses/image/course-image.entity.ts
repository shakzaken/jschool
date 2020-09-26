import {Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Course} from "../courses.entity";

@Entity()
export class CourseImage {

  @PrimaryGeneratedColumn()
  id:number;

  /*TODO temporary */

  @Column({type:"mediumblob"})
  image: Buffer;


  @ManyToOne(type => Course)
  course: Course;

  @Column()
  courseId:number;


}
