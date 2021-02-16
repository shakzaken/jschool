import {observable,action,computed} from "mobx";
import {LoginDto, LoginResponse, User} from "../types/types";
import {MessageStore} from "./message-store";
import jwtDecode from "jwt-decode";
import {api} from "../api/api";

export class AuthStore {


  @observable
  email:string = "";

  @observable
  password:string = "";

  @observable
  token: string;

  @observable
  user:User;

  @observable
  loginErrorMessage: boolean = false;

  messageStore:MessageStore;

  constructor(messageStore : MessageStore){
    this.messageStore = messageStore;
    this.updateStoreFromLocalStorage();
  }


  @computed
  get isAuthenticate(){
    return this.user != null && this.token != null;
  }


  @action.bound
  setEmail(email:string){
    this.email = email;
  }

  @action.bound
  setPassword(password: string){
    this.password = password;
  }

  @action.bound
  setUser(user:User){
    this.user = user;
  }

  @action.bound
  setLoginErrorMessage(loginErrorMessage:boolean){
    this.loginErrorMessage = loginErrorMessage;
  }

  @action.bound
  setToken(token:string){
    this.token = token;
  }

  public logout(event: any){
    event.preventDefault();
    this.setUser(null);
    this.setToken(null);
    localStorage.clear();
  }


  public async login(){
    const loginDto : LoginDto = {
      email: this.email,
      password: this.password
    };
    const response = await api.auth.login(loginDto);

    const token = response.token;
    const decoded : any = jwtDecode(token);

    const user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };
    this.setUser(user);
    this.setToken(token);
    this.updateLocalStorage(token);
    api.setDefaultAuthHeaders(response.token);
  }


  private updateLocalStorage(token:string){
    localStorage.setItem("token",token);
  }


  private updateStoreFromLocalStorage(){
    const token = localStorage.getItem("token");

    /* No token in local storage */
    if(token == null){
      return;
    }
    const decoded : any = jwtDecode(token);
    const user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };

    const timeLeft = decoded.exp - Date.now()/1000;
    if(timeLeft > 0){
      this.setToken(token);
      this.setUser(user);
      api.setDefaultAuthHeaders(token);
    }

  }


}
