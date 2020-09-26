import {Course, CourseEditMenuOptions} from "../types/types";
import {action, observable} from "mobx";
import axios, {AxiosRequestConfig} from "axios";
import {MessageStore, MessageType} from "./message-store";

export class CourseEditStore {



  constructor(private messageStore:MessageStore){}

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



  async saveCourseFiles(files:File[]){

    const formData: FormData = new FormData();
    const config : AxiosRequestConfig = {
      headers:{
        'content-type': 'multipart/form-data'
      }
    };
    for(let i = 0 ; i< files.length ; i++){
      formData.append(`files`,files[i]);
    }

    try{
      await axios.post(`courses/images/${this.course.id}`,formData,config);
      this.messageStore.displayMessage("Course Images Saved successfully",MessageType.SUCCESS);
    }catch (err) {
      this.messageStore.displayMessage("Saving Images Operation Failed",MessageType.ERROR);
    }
  }


}
