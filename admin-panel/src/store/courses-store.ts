import {action, observable} from "mobx";
import {Course, CreateCourseDto} from "../types/types";
import {MessageStore, MessageType} from "./message-store";
import axios, {AxiosResponse} from "axios";


export class CoursesStore{


  @observable
  courseEdit:Course;

  @observable
  courses:Course[];

  @observable
  name:string;

  @observable
  description:string;

  private messageStore: MessageStore;

  constructor(messageStore: MessageStore){
    this.messageStore = messageStore;
  }


  @action.bound
  setName(name: string){
    this.name = name;
  }

  @action.bound
  setDescription(description: string){
    this.description = description;
  }

  @action.bound
  setCourses(courses:Course[]){
    this.courses = courses;
  }

  @action.bound
  setCourseEdit(course: Course){
    this.courseEdit = course;
  }




  async fetchCourses(){
    try{
      const response : AxiosResponse<Course[]> = await axios.get("courses");
      this.setCourses(response.data);
    }catch(err){
      console.error("Failed to fetch courses");
    }
  }

  async createCourse(event: any){
    event.preventDefault();
    try{
      const course: CreateCourseDto = {
        name: this.name,
        description: this.description
      };
      await axios.post("courses",course);
      this.messageStore.displayMessage("Course Created Successfully",MessageType.SUCCESS);
    }catch(err){
      this.messageStore.displayMessage("Course Creation Failed",MessageType.ERROR);
    }
  }

  public async deleteCourse(course:Course){
    console.log("delete course",course);
  }
}
