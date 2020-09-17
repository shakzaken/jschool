import {observable,action} from "mobx";
import axios from "axios";
import {MessageStore} from "./message-store";
import {UsersStore} from "./users-store";

export enum MenuOptions {
  CreateCourse = "CreateCourse",
  CoursesList = "CoursesList",
  CreateUser = "CreateUser",
  UsersList= "UsersList",
  CreateDegree = "CreateDegree",
  DegreeList="DegreeList"
}

export class RootStore {

  @observable
  activeMenu: MenuOptions = null;



  usersStore: UsersStore;
  messageStore:MessageStore;


  constructor(){
    const baseUrl = "http://localhost:3000/";

    axios.defaults.baseURL = baseUrl;

    const user = {
      email:"shak@gmail.com",
      password:"1234"
    };
    axios.post("auth/login",user)
      .then(res => {
        axios.defaults.headers.common['Authorization'] = res.data.token;
      });


    this.messageStore = new MessageStore();
    this.usersStore = new UsersStore(this.messageStore);


  }



  @action.bound
  setActiveMenu(activeMenu: MenuOptions){
    this.activeMenu = activeMenu;
  }


  @action.bound
  handleMenuClick(event:any,data:any){
    this.setActiveMenu(data.name);
  }


}
