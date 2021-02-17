import {action, computed, observable} from "mobx";
import {LoginResponse, UserModel} from "../types";
import {MessageStore, MessageType} from "./message-store";
import {History} from "history";
import {api} from "../api/apiService";


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
      api.auth.setAuthHeader(token);
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
      const loginResponse :LoginResponse = await api.auth.login(loginData);
      this.setUser(loginResponse.user);
      this.setToken(loginResponse.token);
      api.auth.setAuthHeader(loginResponse.token);
      localStorage.setItem("token",loginResponse.token);
      localStorage.setItem("user",JSON.stringify(loginResponse.user));
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
