import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/user.entity";
import {Course} from "../courses.entity";


@Entity()
export class CourseComment {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Course,{onDelete: 'CASCADE' })
  course:Course;

  @Column()
  courseId:number;

  @Column()
  userId:number;

  @ManyToOne(type => User,{onDelete: 'CASCADE' })
  user:User;

  @Column()
  comment: string;

  @Column()
  date :Date;

}
