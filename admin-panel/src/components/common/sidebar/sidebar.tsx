import React from "react";
import {Menu} from "semantic-ui-react";
import "./sidebar.scss";
import {observer,inject} from "mobx-react";
import {MenuOptions, RootStore} from "../../../store/root-store";

interface SidebarProps {

  rootStore?: RootStore;
}



@inject((allStores :any) => ({
  rootStore:allStores.rootStore
}))
@observer
export class Sidebar extends React.Component<SidebarProps,{}>{


  render(){

    const rootStore = this.props.rootStore;
    return (
      <div className="sidebar">
        <Menu vertical className="sidebar-menu" >
          <Menu.Item>
            <Menu.Header>Users</Menu.Header>
            <Menu.Menu >
              <Menu.Item
                name={MenuOptions.UsersList}
                active={rootStore.activeMenu === MenuOptions.UsersList}
                onClick={rootStore.handleMenuClick}>Users List
              </Menu.Item>
              <Menu.Item
                name={MenuOptions.CreateUser}
                active={rootStore.activeMenu === MenuOptions.CreateUser}
                onClick={rootStore.handleMenuClick}>Create User
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Degrees</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name={MenuOptions.DegreeList}
                active={rootStore.activeMenu === MenuOptions.DegreeList}
                onClick={rootStore.handleMenuClick}>Degrees List
              </Menu.Item>
              <Menu.Item
                name={MenuOptions.CreateDegree}
                active={rootStore.activeMenu === MenuOptions.CreateDegree}
                onClick={rootStore.handleMenuClick}>Create Degree
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Courses</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name={MenuOptions.CoursesList}
                active={rootStore.activeMenu === MenuOptions.CoursesList}
                onClick={rootStore.handleMenuClick}>Course List
               </Menu.Item>
              <Menu.Item
                name={MenuOptions.CreateCourse}
                active={rootStore.activeMenu === MenuOptions.CreateCourse}
                onClick={rootStore.handleMenuClick}>Create Course
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

        </Menu>
      </div>
    )
  }
}

