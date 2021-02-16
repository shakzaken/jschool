import {observable,action} from "mobx";
import axios from "axios";
import {MessageStore} from "./message-store";
import {UsersStore} from "./users/users-store";
import {MenuOptions} from "../types/types";
import {DegreesStore} from "./degrees/degrees-store";
import {CoursesStore} from "./courses/courses-store";
import {AuthStore} from "./auth-store";


export class RootStore {

  @observable
  activeMenu: MenuOptions = null;

  @observable
  loading: boolean = true;

  usersStore: UsersStore;
  messageStore:MessageStore;
  degreesStore :DegreesStore;
  coursesStore : CoursesStore;
  authStore : AuthStore;


  constructor(){
    //this.login();
    const baseUrl = "http://localhost:3000/";
    axios.defaults.baseURL = baseUrl;

    this.messageStore = new MessageStore();
    this.authStore = new AuthStore(this.messageStore);
    this.usersStore = new UsersStore(this.messageStore);
    this.degreesStore = new DegreesStore(this.messageStore);
    this.coursesStore = new CoursesStore(this.messageStore);
    this.setLoading(false);

  }



  @action.bound
  setLoading(loading: boolean){
    this.loading = loading;
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
