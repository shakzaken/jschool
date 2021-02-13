import {Course, CourseEditMenuOptions, UserEditMenuOptions} from "../types/types";
import {action, computed, observable} from "mobx";
import axios, {AxiosRequestConfig} from "axios";
import {MessageStore, MessageType} from "./message-store";
import {User} from "../types/types";


export class UserEditStore {



  constructor(private messageStore:MessageStore){

  }

  @observable
  user: User;

  @observable
  menuType: UserEditMenuOptions = UserEditMenuOptions.EditUser;

  @observable
  imageBuffer: any[];

  @observable
  imageSrc:string = "";

  @action.bound
  setUser(user:User){
    this.user = user;
  }

  @action.bound
  setName(name:string){
    this.user.name = name;
  }

  @action.bound
  setEmail(email:string){
    this.user.email = email;
  }



  @action.bound
  setMenuType(type :UserEditMenuOptions){
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



  async saveUserFiles(files:File[]){

    const formData: FormData = new FormData();
    const config : AxiosRequestConfig = {
      headers:{ 'content-type': 'multipart/form-data'}
    };
    for(let i = 0 ; i< files.length ; i++){
      formData.append(`files`,files[i]);
    }

    try{
      const result = await axios.post(`users/images/${this.user.id}`,formData,config);
      const imageData = result.data;
      this.setImageSrc(`data:image/png;base64,${imageData.image}`);
      this.messageStore.displayMessage("User Images Saved successfully",MessageType.SUCCESS);
    }catch (err) {
      this.messageStore.displayMessage("Saving Images Operation Failed",MessageType.ERROR);
    }
  }

  async fetchUserImage(){
    const userId = this.user && this.user.id;
    const result = await axios.get(`users/images/${userId}`);
    const imageData = result.data[0];
    if(imageData){
      this.setImageSrc(`data:image/png;base64,${imageData.image}`);
    }
  }


  async updateUser(event:any){
    event.preventDefault();
    const user :User = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email
    };
    try{
      await axios.put("users",user);
      this.messageStore.displayMessage("User Updated successfully",MessageType.SUCCESS);

    }catch(err){
      this.messageStore.displayMessage("User Update Failed",MessageType.ERROR);

    }

  }






}
