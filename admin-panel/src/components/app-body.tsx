import React,{Component} from "react";
import {PanelBody} from "./panel-body/panel-body";
import {Sidebar} from "./common/sidebar/sidebar";
import {Switch} from "react-router";
import {Route} from "react-router";
import {Redirect} from "react-router";
import {Login} from "./auth/login";
import {Router} from "react-router";
import {createBrowserHistory} from "history";
import {observer,inject} from "mobx-react";
import {RootStore} from "../store/root-store";

interface AppBodyProps{
  rootStore? : RootStore;
}

@inject("rootStore")
@observer
export class AppBody extends Component<AppBodyProps,{}> {


  mainPanel(){
    return(
      <div className="app-body">
        <Sidebar/>
        <PanelBody/>
      </div>
    )
  };

  customHistory = createBrowserHistory();



  render(){
    const isAuthenticated = this.props.rootStore.authStore.isAuthenticate;
    return (
      <Router history={this.customHistory}>
          <Switch>
              <Route exact path="/">
                {isAuthenticated ?  this.mainPanel() : <Redirect to="/login" />}
              </Route>
              <Route  path="/login">
                  <Login history={this.customHistory}/>
              </Route>
          </Switch>
      </Router>
    )
  };

}
