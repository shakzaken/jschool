import React,{Component} from "react";
import "./navbar.scss"
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {RootStore} from "../../store/root.store";
import {History} from "history";
import {withRouter} from "react-router-dom";

interface NavbarProps{
  rootStore?:RootStore;
  history?:History;
}

@inject("rootStore")
@observer
class Navbar extends Component<NavbarProps,{}> {

  authStore = this.props.rootStore.authStore;


  rightLinks(){
    if(this.authStore.isLoggedIn){
      return <span onClick={event => this.authStore.logout(this.props.history)}>Logout</span>;
    }else{
      return <Link to="/login">Login</Link> ;
    }
  }


  render(){
    return (
    <div className="navbar">
      <div className="navbar-left-links">
        <Link to="/">Home</Link>
      </div>
      <h2 className="title">Jschool</h2>
      <div className="navbar-right-links">
        {this.rightLinks()}
      </div>
    </div>
    )
  }
}


//@ts-ignore
export default withRouter(Navbar);