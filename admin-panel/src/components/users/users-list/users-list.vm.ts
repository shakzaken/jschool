import {observable,action,computed} from "mobx";
import {ViewModel} from "mmlpx";
import axios,{AxiosRequestConfig} from "axios";

export interface User {
  id:number;
  email:string;
  name:string;

}

@ViewModel
export class UsersListVm {


  @observable
  users: User[] = [];


  constructor(){
    this.fetchUsers();
  }


  async fetchUsers(){
    const res = await axios.get(`users`);
    const users = res.data;
    this.setUsers(users);
  }


  @action.bound
  setUsers(users: User[]){
    this.users = users;
  }




}
