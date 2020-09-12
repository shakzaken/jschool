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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzaGFrQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFrIiwiaWF0IjoxNTk5OTM3NDQ5LCJleHAiOjE2MDAwMjM4NDl9.C1gRQJA9G5ZzVC2rtRADiJTRvYTd8ok5SQEfIwB5fLQ";
    const baseUrl = "http://localhost:3000/";
    axios.defaults.baseURL = baseUrl;
    axios.defaults.headers.common['Authorization'] = token;


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
