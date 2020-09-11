import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user.entity";


@Entity()
export class UserImage{


  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  image:string;

  @Column()
  userId:number;

  @ManyToOne(type => User)
  user:User;

}
