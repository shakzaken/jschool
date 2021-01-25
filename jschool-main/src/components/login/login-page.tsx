import React,{Component} from "react";
import "./login-page.scss";
import {Form,Button} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import {RootStore} from "../../store/root.store";
import {AuthStore} from "../../store/auth-store";
import {History} from "history";

interface LoginPageProps {
  rootStore?:RootStore;
  history? : History;
}

@inject("rootStore")
@observer
export class LoginPage extends Component<LoginPageProps,{}>{

  store : AuthStore = this.props.rootStore.authStore;
  constructor(props: LoginPageProps) {
    super(props);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if(this.store.isLoggedIn){
      this.props.history.push("/");
    }
  }

  async login(event: any){
    event.preventDefault();
    await this.store.onLogin(this.props.history);
  }

  render(){

    const store = this.store;
    return (
      <div className="login-page">
        <h3 className="login-title">Login</h3>
        <Form className="form" onSubmit={event => this.login(event)}>
          <Form.Field>
            <label>Email</label>
            <input
              value={store.email}
              placeholder='Email'
              onChange={event => store.setEmail(event.target.value)}
              type="text"
              />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder='Password'
              value={store.password}
              type="password"
              onChange={event => store.setPassword(event.target.value)}
            />
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>

      </div>
    );
  }
}
