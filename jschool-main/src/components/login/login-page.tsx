import React,{Component} from "react";
import "./login-page.scss";
import {Form,Button} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import {RootStore} from "../../store/root.store";

interface LoginPageProps {
  rootStore?:RootStore;
}

@inject("rootStore")
@observer
export class LoginPage extends Component<LoginPageProps,{}>{



  render(){

    const store = this.props.rootStore.authStore;
    return (
      <div className="login-page">
        <h3 className="login-title">Login</h3>
        <Form className="form" onSubmit={event => store.onLogin(event)}>
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
