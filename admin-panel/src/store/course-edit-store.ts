import {Course, CourseEditMenuOptions} from "../types/types";
import {action, observable} from "mobx";


export class CourseEditStore {

  @observable
  course: Course;

  @observable
  name:string;

  @observable
  description:string;

  @observable
  menuType: CourseEditMenuOptions = CourseEditMenuOptions.EditCourse;

  @action.bound
  setCourse(course:Course){
    this.course = course;
  }

  @action.bound
  setName(name:string){
    this.name = name;
  }

  @action.bound
  setDescription(description:string){
    this.description = description;
  }

  @action.bound
  setMenuType(type :CourseEditMenuOptions){
    this.menuType = type;
  }





}
