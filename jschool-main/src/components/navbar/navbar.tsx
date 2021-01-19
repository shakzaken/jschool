import React,{Component} from "react";
import "./navbar.scss"
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {RootStore} from "../../store/root.store";


interface NavbarProps {
  rootStore?:RootStore;
}

@inject("rootStore")
@observer
export class Navbar extends Component<NavbarProps,{}> {

  authStore = this.props.rootStore.authStore;


  rightLinks(){
    if(this.authStore.isLoggedIn){
      return <span onClick={event => this.authStore.logout()}>Logout</span>;
    }else{
      return <Link to="/login">Login</Link> ;
    }
  }


  render(){
    return (
    <div className="navbar">
      <div className="navbar-left-links">
        <Link to="/home">Home</Link>
      </div>
      <h2 className="title">Jschool</h2>
      <div className="navbar-right-links">
        {this.rightLinks()}
      </div>
    </div>
    )
  }

}
