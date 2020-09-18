import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Navbar} from "./components/common/navbar/navbar";
import {Sidebar} from "./components/common/sidebar/sidebar";
import {PanelBody} from "./components/panel-body/panel-body";
import {Provider} from "mobx-react";
import {RootStore} from "./store/root-store";
import {AppBody} from "./components/app-body";
import {Switch, Route, Router} from "react-router";
import {Login} from "./components/auth/login";
import {createBrowserHistory} from "history"

function App() {
  const customHistory = createBrowserHistory();
  const rootStore = new RootStore();
  return (
    <div className="App">
      <Provider rootStore={rootStore}>
        <Navbar/>
        <Router history={customHistory}>
          <Switch>
            <Route exact path="/">
              <Login history={customHistory}/>
            </Route>
            <Route  path="/home">
              <AppBody/>
            </Route>
          </Switch>
        </Router>

      </Provider>
    </div>
  );
}

export default App;
