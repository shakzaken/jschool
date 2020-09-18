import React from "react";
import "./panel-body.scss";
import {CourseList} from "../courses/course-list";
import {UsersList} from "../users/users-list/users-list";
import {DegreesList} from "../degrees/degrees-list";
import {CreateUser} from "../users/create-user/create-user";
import {CreateDegree} from "../degrees/create-degree";
import {CreateCourse} from "../courses/create-course";
import {RootStore} from "../../store/root-store";
import {observer,inject} from "mobx-react";
import {JMessage} from "../common/Jmessage/j-message";
import {MenuOptions} from "../../types/types";


interface PanelBodyProps {
  rootStore?: RootStore;
}


@inject("rootStore")
@observer
export class PanelBody extends React.Component<PanelBodyProps,{}>{



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
        <JMessage/>
        {this.getView(this.props.rootStore.activeMenu)}
      </div>
    );
  }


}
