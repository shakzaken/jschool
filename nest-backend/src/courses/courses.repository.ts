import {DeleteResult, EntityRepository, Repository} from "typeorm";
import {Course} from "./courses.entity";
import {CreateCourseDto} from "./dto/create-course.dto";
import {BadRequestException} from "@nestjs/common";
import {UpdateCourseDto} from "./dto/update-course-dto";




@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {

  async createCourse(createCourseDto : CreateCourseDto) : Promise<Course> {
    const {name,description} = createCourseDto;
    const course = new Course();
    course.name = name;
    course.description = description;
    await this.save(course);
    return course;
  }

  async getAllCourses() : Promise<Course[]>{
    return this.find({});
  }

  async getCourseById(id:number) : Promise<Course>{
    const course = await this.findOne({id: id});
    if(!course){
      throw new BadRequestException("courseId is Invalid");
    }
    return course;
  }

  async deleteCourseById(id:number) : Promise<DeleteResult>{
    const course = this.findOne(id);
    if(!course){
      throw new BadRequestException("Course Id is Invalid");
    }
    const result =  await this.delete(id);
    return result;
  }

  async updateCourse(course: UpdateCourseDto) : Promise<Course>{
    const courseFromDb : Course = await this.getCourseById(course.id);

    courseFromDb.name = course.name;
    courseFromDb.description = course.description;
    return this.save(courseFromDb);

  }

}
