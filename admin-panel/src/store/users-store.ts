import {action, observable} from "mobx";
import {inject, ViewModel} from "mmlpx";
import axios from "axios";
import {MessageStore} from "./message-store";
import {MessageType} from "./message-store";
import {User} from "../types/types";
import {CreateUserDto} from "../types/types";

@ViewModel
export class UsersStore {


  private messageStore : MessageStore;

  constructor(messageStore: MessageStore){
    this.messageStore = messageStore;
  }

  @observable
  userEdit:User;

  @observable
  users: User[] = [];


  @observable
  name: string = "";

  @observable
  email:string = "";

  @observable
  password:string = "";

  @observable
  confirmPassword:string = "";



  @action.bound
  setName(name: string){
    this.name = name;
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
  setConfirmPassword(confirmPassword : string){
    this.confirmPassword = confirmPassword;
  }

  @action.bound
  setUserEdit(user:User){
    this.userEdit = user;
  }




  @action.bound
  setUsers(users: User[]){
    this.users = users;
  }

  @action.bound
  clearForm(){
    this.setName("");
    this.setEmail("");
    this.setPassword("");
    this.setConfirmPassword("");
  }



  async saveUser(event : any){
    event.preventDefault();
    const user : CreateUserDto = {
      name : this.name,
      email: this.email,
      password: this.password
    };

    if(this.password.trim() !== this.confirmPassword.trim()){
      this.messageStore.displayMessage("User Creation Failed",MessageType.ERROR);
      return;
    }
    await axios.post("users",user)
      .catch(() => {
        this.messageStore.displayMessage("User Creation Failed",MessageType.ERROR);
      });
    this.messageStore.displayMessage("User Created Successfully",MessageType.SUCCESS);
    this.clearForm();


  }

  async fetchUsers(){
    const res = await axios.get(`users`);
    const users = res.data;
    this.setUsers(users);
  }

  async deleteUser(user: User){
    console.log("delete user ",user.id);
  }

}
