import {CoursePageStore} from "./course-page.store";
import {DegreePageStore} from "./degree-page.store";
import {HomePageStore} from "./home-page.store";
import {LoginPageStore} from "./login-page.store";
import {RegisterPageStore} from "./register-page.store";
import axios from "axios";

export class RootStore {


  public coursePageStore: CoursePageStore;
  public degreePageStore : DegreePageStore;
  public homePageStore : HomePageStore;
  public loginPageStore: LoginPageStore;
  public registerStore: RegisterPageStore;

  constructor(){

    axios.defaults.baseURL = "http://localhost:3000/";

    this.loginPageStore = new LoginPageStore();
    this.coursePageStore = new CoursePageStore();
    this.degreePageStore = new DegreePageStore();
    this.homePageStore = new HomePageStore();
    this.registerStore = new RegisterPageStore();
  }

}
