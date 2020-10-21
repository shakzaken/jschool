import React,{Component} from "react";
import "./register-page.scss";
import {Button,Form} from "semantic-ui-react";


export class RegisterPage extends Component{


  render(){
    return (
      <div className="register-page">
        <h3 className="register-title">Register</h3>
        <Form className="form">
          <Form.Field>
            <label>Name</label>
            <input placeholder='Name' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input type="password" placeholder='Confirm Password' />
          </Form.Field>
          <Button type='submit'>Register</Button>
        </Form>
      </div>
    );
  }
}
