import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/user.entity";
import {Degree} from "../degree.entity";


@Entity()
export class DegreeComment{


  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  comment: string;

  @Column()
  degreeId:number;

  @ManyToOne(type => Degree)
  degree:Degree;


  @Column()
  userId:number;

  @ManyToOne(type => User)
  user: User;

  @Column()
  date: Date;
}
