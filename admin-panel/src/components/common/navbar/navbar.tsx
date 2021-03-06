import React from "react";
import "./navbar.scss";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../../store/root-store";


interface NavbarProps {
  rootStore? : RootStore;
}

@inject("rootStore")
@observer
export class Navbar extends React.Component<NavbarProps,{}> {


  renderEmail(){
    const authStore = this.props.rootStore.authStore;
    const email = authStore.user && authStore.user.email || "";
    return <span>{email}</span>;
  }

  renderLogout(){
    const authStore = this.props.rootStore.authStore;
    if(authStore.isAuthenticate){
        return <a onClick={event => authStore.logout(event)} href="#">Logout</a>;
    }else{
        return null;
    }
  }


  render(){
    const authStore = this.props.rootStore.authStore;
    return (
      <div className="navbar">
        <h3 className="title">Admin Panel</h3>
        <p className="email">{this.renderEmail()}</p>
        <div className="logout">{this.renderLogout()}</div>
      </div>
    )
  }



}
