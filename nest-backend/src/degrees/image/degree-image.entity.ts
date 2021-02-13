import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Degree} from "../degree.entity";

@Entity()
export class DegreeImage{

  @PrimaryGeneratedColumn()
  id:number;

  @Column("mediumtext")
  image:string;

  @Column()
  degreeId:number;

  @ManyToOne(type => Degree,{onDelete: 'CASCADE' })
  degree: Degree;



}
