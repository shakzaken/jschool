import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, OneToMany, Unique} from "typeorm";
import {Course} from "../courses/courses.entity";
import {DegreeComment} from "./comment/degree-comment.entity";
import {DegreeImage} from "./image/degree-image.entity";


@Entity()
@Unique(["name"])
export class Degree {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  description: string;


  @OneToMany(type => DegreeComment, degreeComments => degreeComments.degree)
  degreeComments: DegreeComment[];

  @OneToMany(type => DegreeImage,degreeImage => degreeImage.degree)
  degreeImages: DegreeImage[];

  @ManyToMany(type => Course)
  @JoinTable({name:"degree_courses"})
  courses: Course[];

}
