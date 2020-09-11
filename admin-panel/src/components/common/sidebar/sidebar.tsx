import React from "react";
import {Menu} from "semantic-ui-react";
import "./sidebar.scss";
import {inject} from "mmlpx";
import {observer} from "mobx-react";
import {MenuOptions, RootStore} from "../../../root-store";


@observer
export class Sidebar extends React.Component{

  @inject(RootStore) vm:RootStore;

  render(){


    return (
      <div className="sidebar">
        <Menu vertical className="sidebar-menu" >
          <Menu.Item>
            <Menu.Header>Users</Menu.Header>
            <Menu.Menu >
              <Menu.Item
                name={MenuOptions.UsersList}
                active={this.vm.activeMenu === MenuOptions.UsersList}
                onClick={this.vm.handleMenuClick}>Users List
              </Menu.Item>
              <Menu.Item
                name={MenuOptions.CreateUser}
                active={this.vm.activeMenu === MenuOptions.CreateUser}
                onClick={this.vm.handleMenuClick}>Create User
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Degrees</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name={MenuOptions.DegreeList}
                active={this.vm.activeMenu === MenuOptions.DegreeList}
                onClick={this.vm.handleMenuClick}>Degrees List
              </Menu.Item>
              <Menu.Item
                name={MenuOptions.CreateDegree}
                active={this.vm.activeMenu === MenuOptions.CreateDegree}
                onClick={this.vm.handleMenuClick}>Create Degree
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Courses</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name={MenuOptions.CoursesList}
                active={this.vm.activeMenu === MenuOptions.CoursesList}
                onClick={this.vm.handleMenuClick}>Course List
               </Menu.Item>
              <Menu.Item
                name={MenuOptions.CreateCourse}
                active={this.vm.activeMenu === MenuOptions.CreateCourse}
                onClick={this.vm.handleMenuClick}>Create Course
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

        </Menu>
      </div>
    )
  }
}

