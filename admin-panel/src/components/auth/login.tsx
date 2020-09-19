import React from "react";
import {Button, Form} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root-store";
import "./login.scss";
import {History} from "history";


interface LoginProps {
  rootStore? :RootStore
  history? : History
}


@inject("rootStore")
@observer
export class Login extends React.Component<LoginProps,{}>{

  constructor(props: any){
    super(props);
    this.login = this.login.bind(this);
  }

  async login(event: any){
    try{
      event.preventDefault();
      const authStore = this.props.rootStore.authStore;
      await authStore.login();
      this.props.history.push("/");
    }catch(err){
      console.error("Login failed");
    }

  }




  render(){
    const authStore = this.props.rootStore.authStore;
    const history = this.props.history;
    return (
      <div className="login-component">
        <h3>Login</h3>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input
               value={authStore.email}
               onChange={event => authStore.setEmail(event.target.value)}
               placeholder="Email"
               type="text"
             />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              value={authStore.password}
              onChange={event => authStore.setPassword(event.target.value)}
              placeholder="Password"
              type="password"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={this.login}>Submit
          </Button>
        </Form>
      </div>
    );
  }
}
