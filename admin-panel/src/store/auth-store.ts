import {observable,action} from "mobx";
import {LoginDto, LoginResponse, User} from "../types/types";
import axios, {AxiosResponse} from "axios";
import {MessageStore} from "./message-store";
import {History} from "history";
export class AuthStore {


  @observable
  email:string;

  @observable
  password:string;

  @observable
  token: string;

  @observable
  user:User;

  messageStore:MessageStore;

  constructor(messageStore : MessageStore){
    this.messageStore = messageStore;
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
    this.setUser(res.data.user);
    this.token = res.data.token;
    axios.defaults.headers["Authorization"] = res.data.token;
  }


}
