import {observable,action,computed} from "mobx";
import {LoginDto, LoginResponse, User} from "../types/types";
import axios, {AxiosResponse} from "axios";
import {MessageStore} from "./message-store";
import {History} from "history";
import jwtDecode from "jwt-decode";


export class AuthStore {


  @observable
  email:string = "";

  @observable
  password:string = "";

  @observable
  token: string;

  @observable
  user:User;

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
  setToken(token:string){
    this.token = token;
  }




  public async login(){
    const loginDto : LoginDto = {
      email: this.email,
      password: this.password
    };
    const res: AxiosResponse<LoginResponse> = await axios.post("auth/login",loginDto);
    const token = res.data.token;
    const decoded : any = jwtDecode(token);

    const user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };
    this.setUser(user);
    this.setToken(token);
    this.updateLocalStorage(token);
    axios.defaults.headers["Authorization"] = res.data.token;
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
      axios.defaults.headers["Authorization"] = token;
    }

  }


}
