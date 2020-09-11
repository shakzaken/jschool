import {observable,action} from "mobx";
import {ViewModel} from "mmlpx";
import axios from "axios";
import {User} from "../users-list/users-list.vm";
import {CreateUserDto} from "./create-user-dto";

@ViewModel
export class CreateUserVm {


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



  async saveUser(){
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
    await axios.post("users",user);
    this.clearForm();

  }

}
