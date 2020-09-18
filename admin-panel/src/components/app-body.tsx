import React,{Component} from "react";
import {PanelBody} from "./panel-body/panel-body";
import {Sidebar} from "./common/sidebar/sidebar";

export class AppBody extends Component {

  render(){
    return (
      <div className="app-body">
        <Sidebar/>
        <PanelBody/>
      </div>
    )
  }
}
