import React from "react";
import {Table} from "semantic-ui-react";
import {UsersListVm} from "./users-list.vm";
import {inject} from "mmlpx";


export class UsersList extends React.Component{


  @inject(UsersListVm) vm : UsersListVm;


  usersRows(){
    const usersList = this.vm.users.map((user:any) => {
      return (
        <Table.Row>
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
