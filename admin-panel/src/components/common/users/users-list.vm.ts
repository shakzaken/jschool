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


  private readonly serverUrl = "http://localhost:3000";
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzaGFrQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFrIiwiaWF0IjoxNTk5NzU2NzYwLCJleHAiOjE1OTk4NDMxNjB9.2FK-4NkhohZmC5X7_XEoLk6mC9RFdSRa0J01PZ-i7ko";


  @observable
  users: User[] = [];


  constructor(){
    //axios.defaults.headers.common['Authorization'] = this.token;
    //axios.defaults.headers.common['Content-Type']  = 'application/json';
    this.fetchUsers();
  }


  async fetchUsers(){
    const res = await axios.get(`${this.serverUrl}/users`,{

    });

    //this.setUsers(users);
  }


  @action.bound
  setUsers(users: User[]){
    this.users = users;
  }




}
