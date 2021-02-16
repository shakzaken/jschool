import React, {Component} from "react";
import {RootStore} from "../../store/root-store";
import {Course, CourseEditMenuOptions, UserEditMenuOptions} from "../../types/types";
import {inject, observer} from "mobx-react";
import {Menu} from "semantic-ui-react";
import {UserEditForm} from "./user-edit-form";
import {UserImageEdit} from "./user-image-edit";
import {User} from "../../types/types";

interface UserEditProps {
  rootStore?:RootStore;
}


@inject("rootStore")
@observer
export class UserEdit extends Component<UserEditProps> {

  private usersEditStore = this.props.rootStore.usersStore.userEditStore;


  renderEditComponent(){
    const menuType : UserEditMenuOptions = this.usersEditStore.menuType;

    switch (menuType) {
      case UserEditMenuOptions.EditUser : return <UserEditForm/>;
      case UserEditMenuOptions.EditImage : return <UserImageEdit/>;
    }
  }


  render(){
    const user : User = this.usersEditStore.user;
    return (
      <div>
        <h2>{user.name}</h2>
        <Menu fluid widths={2}>
          <Menu.Item
            name="User Form"
            onClick={event => this.usersEditStore.setMenuType(UserEditMenuOptions.EditUser)}
            active={this.usersEditStore.menuType === UserEditMenuOptions.EditUser}
          />
          <Menu.Item
            name="User Image"
            onClick={event => this.usersEditStore.setMenuType(UserEditMenuOptions.EditImage)}
            active={this.usersEditStore.menuType === UserEditMenuOptions.EditImage}
          />

        </Menu>
        <div>
          {this.renderEditComponent()}
        </div>
      </div>
    )
  }


  componentWillUnmount(){
    this.usersEditStore.setUser(null);
  }

}
