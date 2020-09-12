import {action, observable} from "mobx";
import {inject, ViewModel} from "mmlpx";
import axios from "axios";
import {CreateUserDto} from "../components/users/create-user/create-user-dto";
import {MessageStore} from "./message-store";
import {MessageType} from "./message-store";


@ViewModel
export class UsersStore {


  private messageStore : MessageStore;

  constructor(messageStore: MessageStore){
    this.messageStore = messageStore;
  }


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

    // if(this.password.trim() === this.confirmPassword.trim()){
    //   await axios.post("users",user);
    // }else{
    //   console.error("Password do not match");
    // }
    console.log("user",user);
    await axios.post("users",user)
      .catch(() => {
        this.messageStore.displayMessage("User Creation Failed",MessageType.ERROR);
      });
    this.messageStore.displayMessage("User Created Successfully",MessageType.SUCCESS);
    //this.clearForm();


  }

}
