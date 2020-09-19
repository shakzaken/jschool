import React from "react";
import "./navbar.scss";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../../store/root-store";
import {Button} from "semantic-ui-react";


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


  render(){
    return (
      <div className="navbar">
        <h3 className="title">Admin Panel</h3>
        <p className="email">{this.renderEmail()}</p>
        <div className="logout"><a href="#">Logout</a></div>
      </div>
    )
  }



}
