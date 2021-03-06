import {Course, CourseEditMenuOptions} from "../types/types";
import {action, computed, observable} from "mobx";
import axios, {AxiosRequestConfig} from "axios";
import {MessageStore, MessageType} from "./message-store";

export class CourseEditStore {



  constructor(private messageStore:MessageStore){

  }

  @observable
  course: Course;

  @observable
  menuType: CourseEditMenuOptions = CourseEditMenuOptions.EditCourse;

  @observable
  imageBuffer: any[];

  @observable
  imageSrc:string = "";

  @action.bound
  setCourse(course:Course){
    this.course = course;
  }

  @action.bound
  setName(name:string){
    this.course.name = name;
  }

  @action.bound
  setDescription(description:string){
    this.course.description = description;
  }

  @action.bound
  setMenuType(type :CourseEditMenuOptions){
    this.menuType = type;
  }

  @action.bound
  setImageBuffer(imageBuffer:any){
    this.imageBuffer = imageBuffer;
  }

  @action.bound
  setImageSrc(imageSrc:any){
    this.imageSrc = imageSrc;
  }


  @computed
  get submitButtonName(){
    if(this.setImageSrc){
      return "Replace Image";
    }else{
      return "Upload Image";
    }
  }



  async saveCourseFiles(files:File[]){

    const formData: FormData = new FormData();
    const config : AxiosRequestConfig = {
      headers:{ 'content-type': 'multipart/form-data'}
    };
    for(let i = 0 ; i< files.length ; i++){
      formData.append(`files`,files[i]);
    }

    try{
      const result = await axios.post(`courses/images/${this.course.id}`,formData,config);
      const imageData = result.data;
      this.setImageSrc(`data:image/png;base64,${imageData.image}`);
      this.messageStore.displayMessage("Course Images Saved successfully",MessageType.SUCCESS);
    }catch (err) {
      this.messageStore.displayMessage("Saving Images Operation Failed",MessageType.ERROR);
    }
  }

  async fetchCourseImage(){
    const courseId = this.course && this.course.id;
    const result = await axios.get(`courses/images/${courseId}`);
    const imageData = result.data;
    this.setImageSrc(`data:image/png;base64,${imageData.image}`)
  }


  async updateCourse(event:any){
    event.preventDefault();
    const course :Course = {
      id: this.course.id,
      name: this.course.name,
      description: this.course.description
    };
    try{
      await axios.put("courses",course);
      this.messageStore.displayMessage("Course Updated successfully",MessageType.SUCCESS);

    }catch(err){
      this.messageStore.displayMessage("Course Update Failed",MessageType.ERROR);

    }

  }






}
