import {observable,action} from "mobx";
import axios from "axios";
import {MessageStore} from "./message-store";
import {UsersStore} from "./users-store";
import {MenuOptions} from "../types/types";
import {DegreesStore} from "./degrees-store";
import {CoursesStore} from "./courses-store";
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




  private login(){
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
