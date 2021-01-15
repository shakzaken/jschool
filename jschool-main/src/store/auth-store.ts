import {action, computed, observable} from "mobx";
import {LoginResponse, UserModel} from "../types";
import axios, {AxiosResponse} from "axios";

export class AuthStore {


  constructor(){
    const token = localStorage.getItem("token");
    if(token){
      const user = JSON.parse(localStorage.getItem("user"));
      this.setUser(user);
      this.setToken(token);
      axios.defaults.headers["Authorization"] = token;
    }
  }

  @observable
  user:UserModel = null;

  @observable
  email:string = "";

  @observable
  password:string = "";

  @observable
  token:string = "";

  @action.bound
  setEmail(email:string){
    this.email = email;
  }

  @action.bound
  setPassword(password:string){
    this.password = password;
  }

  @action.bound
  setUser(user:UserModel){
    this.user = user;
  }

  @action.bound
  setToken(token:string){
    this.token = token;
  }

  @computed
  get isLoggedIn(){
    return !!this.token;
  }


  async onLogin(event:any){
    event.preventDefault();

    const loginData = {
      email:this.email,
      password: this.password
    };

    const res : AxiosResponse<LoginResponse> = await axios.post("/auth/login",loginData);
    this.setUser(res.data.user);
    this.setToken(res.data.token);
    axios.defaults.headers["Authorization"] = res.data.token;
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("user",JSON.stringify(res.data.user));
  }

  @action.bound
  logout(){

    this.user = null;
    this.token = null;
    localStorage.clear();
    console.log("logout");
  }
}
