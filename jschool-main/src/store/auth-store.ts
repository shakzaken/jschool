import {action, computed, observable} from "mobx";
import {LoginResponse, UserModel} from "../types";
import axios, {AxiosResponse} from "axios";
import {MessageStore, MessageType} from "./message-store";
import {History} from "history";

export class AuthStore {

  messageStore:MessageStore;

  @observable
  user:UserModel = null;

  @observable
  email:string = "";

  @observable
  password:string = "";

  @observable
  token:string = "";



  constructor(messageStore:MessageStore){
    this.messageStore = messageStore;
    const token = localStorage.getItem("token");
    if(token){
      const user = JSON.parse(localStorage.getItem("user"));
      this.setUser(user);
      this.setToken(token);
      axios.defaults.headers["Authorization"] = token;
    }
  }

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


  async onLogin(history:History){

    const loginData = {
      email:this.email,
      password: this.password
    };
    try{
      const res : AxiosResponse<LoginResponse> = await axios.post("/auth/login",loginData);
      this.setUser(res.data.user);
      this.setToken(res.data.token);
      axios.defaults.headers["Authorization"] = res.data.token;
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      this.messageStore.displayMessage("You are successfully logged in",MessageType.SUCCESS);
      history.push("/");
    }catch (err){
      this.messageStore.displayMessage("Login Failed",MessageType.ERROR);
    }

  }

  @action.bound
  logout(history: History){
    this.user = null;
    this.token = null;
    localStorage.clear();
    history.push("/login");

  }
}
