import React,{Component} from "react";
import "./login-page.scss";
import {Form,Button} from "semantic-ui-react";


export class LoginPage extends Component{



  render(){

    return (
      <div className="login-page">
        <h3 className="login-title">Login</h3>
        <Form className="form">
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' />
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>

      </div>
    );
  }
}
