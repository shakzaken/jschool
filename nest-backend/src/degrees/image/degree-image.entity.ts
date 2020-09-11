import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Degree} from "../degree.entity";

@Entity()
export class DegreeImage{

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  image:string;

  @Column()
  degreeId:number;

  @ManyToOne(type => Degree)
  degree: Degree;



}
