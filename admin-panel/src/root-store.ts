import {Store} from "mmlpx";
import {observable,action} from "mobx";

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



  @action.bound
  setActiveMenu(activeMenu: MenuOptions){
    this.activeMenu = activeMenu;
  }


  @action.bound
  handleMenuClick(event:any,data:any){
    this.setActiveMenu(data.name);
  }


}
