import React from "react";
import {Button, Form} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root-store";

interface CreateUserProps {
  rootStore? :RootStore
}


@inject("rootStore")
@observer
export class CreateUser extends React.Component<CreateUserProps,{}>{




  render(){
    const usersStore = this.props.rootStore.usersStore;
    return (
      <div>
        <h3>Create User</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              value={usersStore.name}
              onChange={event => usersStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
               value={usersStore.email}
               onChange={event => usersStore.setEmail(event.target.value)}
               placeholder="Email"
               type="text"
             />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              value={usersStore.password}
              onChange={event => usersStore.setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input
              value={usersStore.confirmPassword}
              onChange={event => usersStore.setConfirmPassword(event.target.value)}
              placeholder="Confirm Password"
              type="password"
              autoComplete="off"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick= {event => usersStore.saveUser(event)}>Save
          </Button>
        </Form>
      </div>
    );
  }
}
