import React from "react";
import "./panel-body.scss";
import {CourseList} from "../courses/course-list";
import {UsersList} from "../users/users-list";
import {DegreesList} from "../degrees/degrees-list";
import {CreateUser} from "../users/create-user";
import {CreateDegree} from "../degrees/create-degree";
import {CreateCourse} from "../courses/create-course";
import {MenuOptions} from "../../../root-store";
import {RootStore} from "../../../root-store";
import {inject} from "mmlpx";
import {observer} from "mobx-react";

@observer
export class PanelBody extends React.Component{


  @inject(RootStore) rootStore:RootStore;

  getView(viewName: MenuOptions){
    switch (viewName) {
      case MenuOptions.UsersList: return <UsersList/>;
      case MenuOptions.CreateUser: return <CreateUser/>;
      case MenuOptions.DegreeList: return <DegreesList/>;
      case MenuOptions.CreateDegree: return <CreateDegree/>;
      case MenuOptions.CreateCourse: return <CreateCourse/>;
      case MenuOptions.CoursesList: return <CourseList/>;
    }

  }

  render(){
    return (
      <div className="panel-body">
        {this.getView(this.rootStore.activeMenu)}
      </div>
    );
  }


}
