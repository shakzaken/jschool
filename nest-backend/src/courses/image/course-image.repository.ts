import {PrimaryGeneratedColumn,Column,EntityRepository,Repository} from "typeorm";
import {Course} from "../courses.entity";
import {CourseImage} from "./course-image.entity";


@EntityRepository(CourseImage)
export class CourseImageRepository extends Repository<CourseImage>{

  async createCourseImage(course:Course,image:string) : Promise<CourseImage> {

    const courseImage = new CourseImage();
    courseImage.course = course;
    courseImage.image = image;
    const result = await this.save(courseImage);
    return result;
  }

  async deleteCourseImages(courseImages:CourseImage[]): Promise<any>{
    return this.remove(courseImages);
  }

  async getImageByCourseId(courseId: number) : Promise<CourseImage>{
    return this.findOne({where:{courseId:courseId}});
  }

  async getImagesByCourseId(courseId: number) : Promise<CourseImage[]>{
    return this.find({where:{courseId:courseId}});
  }

}
