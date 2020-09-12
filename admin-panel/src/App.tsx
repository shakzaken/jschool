import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Navbar} from "./components/common/navbar/navbar";
import {Sidebar} from "./components/common/sidebar/sidebar";
import {PanelBody} from "./components/panel-body/panel-body";
import {Provider} from "mobx-react";
import {RootStore} from "./store/root-store";

function App() {

  const rootStore = new RootStore();
  return (
    <div className="App">
      <Provider rootStore={rootStore}>
        <Navbar/>
        <div className="app-body">
          <Sidebar/>
          <PanelBody/>
        </div>
      </Provider>


    </div>
  );
}

export default App;
