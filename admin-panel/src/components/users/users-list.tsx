import React from "react";
import {Icon, Table} from "semantic-ui-react";
import {observer, inject} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {Course, MenuOptions, User} from "../../types/types";

interface UsersListProps {
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class UsersList extends React.Component<UsersListProps,{}>{

  usersStore = this.props.rootStore.usersStore;
  rootStore = this.props.rootStore;

  componentDidMount(){
    this.usersStore.fetchUsers();
  }

  onCourseEditSelect(user:User){
    const clonedUser:User = {
      id: user.id,
      name:user.name,
      email: user.email
    };

    this.usersStore.userEditStore.setUser(clonedUser);
    this.rootStore.setActiveMenu(MenuOptions.UserEdit);
  }

  usersRows(){

    const users = this.usersStore.users || [];
    const usersList = users.map((user:any) => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell className="edit-icon">
            <Icon name="edit"
                  onClick={(event:any) => this.onCourseEditSelect(user)}/>
          </Table.Cell>
          <Table.Cell className="delete-icon">
            <Icon name="delete" onClick={(event:any) => this.usersStore.deleteUser(user)}/>
          </Table.Cell>
        </Table.Row>
      );
    });
    return usersList;
  }




  render(){
    return (
      <div>
        <h4>Users List</h4>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.usersRows()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
