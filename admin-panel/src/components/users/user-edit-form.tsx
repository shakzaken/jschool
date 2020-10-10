import React from "react";
import {Button, Form} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root-store";

interface UserEditFormProps {
  rootStore? :RootStore
}


@inject("rootStore")
@observer
export class UserEditForm extends React.Component<UserEditFormProps,{}>{




  render(){
    const userEditStore = this.props.rootStore.usersStore.userEditStore;
    const user = userEditStore.user;
    return (
      <div>
        <h3>Edit User</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              value={user.name}
              onChange={event => userEditStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
               value={user.email}
               onChange={event => userEditStore.setEmail(event.target.value)}
               placeholder="Email"
               type="text"
             />
          </Form.Field>
          <Button
            type="submit"
            onClick= {event => userEditStore.updateUser(event)}>Update
          </Button>
        </Form>
      </div>
    );
  }
}
