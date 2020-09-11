import {Store} from "mmlpx";
import {observable,action} from "mobx";
import axios from "axios";


export enum MenuOptions {
  CreateCourse = "CreateCourse",
  CoursesList = "CoursesList",
  CreateUser = "CreateUser",
  UsersList= "UsersList",
  CreateDegree = "CreateDegree",
  DegreeList="DegreeList"
}

@Store
export class RootStore {

  @observable
  activeMenu: MenuOptions = null;


  constructor(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzaGFrQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFrIiwiaWF0IjoxNTk5ODMyNzE5LCJleHAiOjE1OTk5MTkxMTl9.jQsOe3BQPKtKJCPlYzx8_jV0CF5QSqIClSRpgVAXCfY";
    const baseUrl = "http://localhost:3000/";
    axios.defaults.baseURL = baseUrl;
    axios.defaults.headers.common['Authorization'] = token;

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
