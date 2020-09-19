import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Navbar} from "./components/common/navbar/navbar";
import {Provider} from "mobx-react";
import {RootStore} from "./store/root-store";
import {AppBody} from "./components/app-body";
import {Switch, Route, Router, Redirect} from "react-router";
import {Login} from "./components/auth/login";


class App extends React.Component{


  render(){
    const rootStore = new RootStore();
    return (
      <div className="App">
        <Provider rootStore={rootStore}>
          <Navbar/>
          <AppBody/>
        </Provider>
      </div>
    );

  }

}

export default App;
