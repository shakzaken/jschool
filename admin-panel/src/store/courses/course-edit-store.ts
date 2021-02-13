import {Course, CourseEditMenuOptions} from "../../types/types";
import {action, computed, observable} from "mobx";
import {MessageStore, MessageType} from "../message-store";
import {api} from "../../api/api";

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
    for(let i = 0 ; i< files.length ; i++){
      formData.append(`files`,files[i]);
    }

    try{
      const imageData = await api.courses.saveCourseImages(this.course.id,formData);
      this.setImageSrc(`data:image/png;base64,${imageData.image}`);
      this.messageStore.displayMessage("Course Images Saved successfully",MessageType.SUCCESS);
    }catch (err) {
      this.messageStore.displayMessage("Saving Images Operation Failed",MessageType.ERROR);
    }
  }

  async fetchCourseImage(){
    const courseId = this.course && this.course.id;
    const imageData = await api.courses.getCourseImages(courseId);
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
      await api.courses.updateCourse(course);
      this.messageStore.displayMessage("Course Updated successfully",MessageType.SUCCESS);

    }catch(err){
      this.messageStore.displayMessage("Course Update Failed",MessageType.ERROR);

    }

  }






}
