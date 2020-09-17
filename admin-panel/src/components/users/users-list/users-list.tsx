import React from "react";
import {Table} from "semantic-ui-react";
import {observer, inject} from "mobx-react";
import {RootStore} from "../../../store/root-store";

interface UsersListProps {
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class UsersList extends React.Component<UsersListProps,{}>{

  usersStore = this.props.rootStore.usersStore;

  componentDidMount(){
    this.usersStore.fetchUsers();
  }

  usersRows(){

    const users = this.usersStore.users || [];
    const usersList = users.map((user:any) => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
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
