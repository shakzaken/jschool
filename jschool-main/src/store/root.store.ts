import {CoursePageStore} from "./course-page.store";
import {DegreePageStore} from "./degree-page.store";
import {HomePageStore} from "./home-page.store";
import {AuthStore} from "./auth-store";
import {RegisterPageStore} from "./register-page.store";
import axios from "axios";

export class RootStore {


  public coursePageStore: CoursePageStore;
  public degreePageStore : DegreePageStore;
  public homePageStore : HomePageStore;
  public authStore: AuthStore;
  public registerStore: RegisterPageStore;

  constructor(){

    axios.defaults.baseURL = "http://localhost:3000/";

    this.authStore = new AuthStore();
    this.coursePageStore = new CoursePageStore(this.authStore);
    this.degreePageStore = new DegreePageStore(this.authStore);
    this.homePageStore = new HomePageStore();
    this.registerStore = new RegisterPageStore();
  }

}
