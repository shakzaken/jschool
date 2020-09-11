import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Navbar} from "./components/common/navbar/navbar";
import {Sidebar} from "./components/common/sidebar/sidebar";
import {PanelBody} from "./components/common/panel-body/panel-body";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="app-body">
        <Sidebar/>
        <PanelBody/>
      </div>

    </div>
  );
}

export default App;
