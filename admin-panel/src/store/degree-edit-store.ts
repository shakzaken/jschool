import {Degree, DegreeEditMenuOptions,Course,SelectOption} from "../types/types";
import {action, computed, observable} from "mobx";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {MessageStore, MessageType} from "./message-store";


export class DegreeEditStore{



  constructor(private messageStore:MessageStore){

  }

  @observable
  degree: Degree;

  @observable.ref
  private allCourses: Course[] = [];

  @observable.ref
  public selectedCourses: string[] = [];

  @observable
  menuType: DegreeEditMenuOptions = DegreeEditMenuOptions.EditDegree;

  @observable
  imageBuffer: any[];

  @observable
  imagesSrc:string[] = [];


  @computed
  get allCoursesInUI(){
    return this.allCourses.map(this.mapCourseToSelectInput);
  }

  @action.bound
  setDegree(degree:Degree){
    this.degree = degree;
  }

  @action.bound
  setName(name:string){
    this.degree.name = name;
  }

  @action.bound
  setDescription(description:string){
    this.degree.description = description;
  }

  @action.bound
  setMenuType(type :DegreeEditMenuOptions){
    this.menuType = type;
  }

  @action.bound
  setImageBuffer(imageBuffer:any){
    this.imageBuffer = imageBuffer;
  }

  @action.bound
  setImagesSrc(imagesSrc:string[]){
    this.imagesSrc = imagesSrc;
  }

  @action.bound
  setCoursesAndSelectedCourses(allCourses:Course[],selectedCourses: Course[]){
    this.setAllCourses(allCourses);
    const selectedCoursesIds = selectedCourses.map(course => course.id.toString());
    this.setSelectedCourses(selectedCoursesIds);
  }

  @action.bound
  setAllCourses(allCourses:Course[]){
    this.allCourses = allCourses;
  }
  @action.bound
  setSelectedCourses(selectedCourses:string[]){
    this.selectedCourses = selectedCourses;
  }


  @computed
  get submitButtonName(){
    if(this.setImagesSrc.length > 0){
      return "Replace Image";
    }else{
      return "Upload Image";
    }
  }



  async saveDegreeFiles(files:File[]){

    const formData: FormData = new FormData();
    const config : AxiosRequestConfig = {
      headers:{ 'content-type': 'multipart/form-data'}
    };
    for(let i = 0 ; i< files.length ; i++){
      formData.append(`files`,files[i]);
    }

    try{
      const result = await axios.post(`degrees/images/${this.degree.id}`,formData,config);
      const imagesArray = result.data.map((imageData:any) => {
        return `data:image/png;base64,${imageData.image}`
      });
      this.setImagesSrc(imagesArray);
      this.messageStore.displayMessage("Degree Images Saved successfully",MessageType.SUCCESS);
    }catch (err) {
      this.messageStore.displayMessage("Saving Images Operation Failed",MessageType.ERROR);
    }
  }

  async fetchDegreeImage(){
    const degreeId = this.degree && this.degree.id;
    const result = await axios.get(`degrees/images/${degreeId}`);
    const imagesArray = result.data.map((imageData:any) => {
      return `data:image/png;base64,${imageData.image}`
    });
    this.setImagesSrc(imagesArray);
  }


  async updateDegree(event:any){
    event.preventDefault();
    const degree :Degree = {
      id: this.degree.id,
      name: this.degree.name,
      description: this.degree.description
    };
    try{
      await axios.put("degrees",degree);
      this.messageStore.displayMessage("Degree Updated successfully",MessageType.SUCCESS);

    }catch(err){
      this.messageStore.displayMessage("Degree Update Failed",MessageType.ERROR);

    }

  }

  mapCourseToSelectInput(course:Course) : SelectOption{
      return {
        text: course.name,
        key: course.id.toString(),
        value: course.id.toString()
      }
  }
  


  async fetchDegreeCourses(){
    const degreeId = this.degree && this.degree.id;
    const allCoursesReponse : AxiosResponse<any> = await axios.get("courses");
    const selectedCoursesResponse : AxiosResponse<any> = await axios.get(`degrees/courses/${degreeId}`);
    this.setCoursesAndSelectedCourses(allCoursesReponse.data,selectedCoursesResponse.data.courses);
  }

  async fetchAllCourses(){
    const response : AxiosResponse<Course[]> = await axios.get(`courses`);
    console.log(response);
  }

  async saveDegreeCourses(event:any){
    const data = {
      degreeId: this.degree.id,
      coursesIds: this.selectedCourses
    };
    await axios.post("/degrees/courses",data);
    this.fetchDegreeCourses();
      
  }






}
