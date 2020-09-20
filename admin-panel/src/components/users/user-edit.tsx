import React,{Component} from "react";
import {RootStore} from "../../store/root-store";
import {inject, observer} from "mobx-react";
import {User} from "../../types/types";

interface UserEditProps {
  rootStore?:RootStore;
}


@inject("rootStore")
@observer
export class UserEdit extends Component<UserEditProps> {


  render(){
    const usersStore = this.props.rootStore.usersStore;
    const user : User = usersStore.userEdit;
    return <div>User Edit , User id : {user.id}</div>
  }


  componentWillUnmount(){
    const usersStore = this.props.rootStore.usersStore;
    usersStore.setUserEdit(null);
  }

}
