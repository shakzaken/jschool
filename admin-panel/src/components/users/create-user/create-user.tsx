import React from "react";
import {Button, Form} from "semantic-ui-react";
import {observer} from "mobx-react";
import {CreateUserVm} from "./create-user.vm";
import {inject} from "mmlpx";

@observer
export class CreateUser extends React.Component{

  @inject(CreateUserVm) vm: CreateUserVm;


  constructor(props: any){
    super(props);
    this.setName = this.setName.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  setName(event : any){
    this.vm.setName(event.target.value);
  }
  setEmail(event:any){
    this.vm.setEmail(event.target.value);
  }
  setPassword(event:any){
    this.vm.setPassword(event.target.value);
  }
  setConfirmPassword(event: any){
    this.vm.setConfirmPassword(event.target.value);
  }
  saveUser(event : any){
    event.preventDefault();
    this.vm.saveUser();
  }


  render(){

    return (
      <div>
        <h3>Create User</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input value={this.vm.name} onChange={this.setName}  type="text"/>
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <input value={this.vm.email} onChange={this.setEmail} placeholder="Email" type="text"/>
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input value={this.vm.password} onChange={this.setPassword} placeholder="Password" type="password"/>
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input value={this.vm.confirmPassword} onChange={this.setConfirmPassword} placeholder="Confirm Password" type="password"/>
          </Form.Field>

          <Button type="submit" onClick={this.saveUser}>Save</Button>
        </Form>
      </div>
    );
  }
}
