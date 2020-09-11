import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/user.entity";
import {Course} from "../courses.entity";


@Entity()
export class CourseComment {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Course)
  course:Course;

  @Column()
  courseId:number;

  @Column()
  userId:number;

  @ManyToOne(type => User)
  user:User;

  @Column()
  comment: string;

  @Column()
  date :Date;

}
