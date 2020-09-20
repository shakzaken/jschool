import React from "react";
import "./panel-body.scss";
import {CourseList} from "../courses/course-list";
import {UsersList} from "../users/users-list";
import {DegreesList} from "../degrees/degrees-list";
import {CreateUser} from "../users/create-user";
import {CreateDegree} from "../degrees/create-degree";
import {CreateCourse} from "../courses/create-course";
import {RootStore} from "../../store/root-store";
import {observer,inject} from "mobx-react";
import {JMessage} from "../common/Jmessage/j-message";
import {MenuOptions} from "../../types/types";
import {CourseEdit} from "../courses/course-edit";
import {DegreeEdit} from "../degrees/degree-edit";
import {UserEdit} from "../users/user-edit";


interface PanelBodyProps {
  rootStore?: RootStore;
}


@inject("rootStore")
@observer
export class PanelBody extends React.Component<PanelBodyProps,{}>{



  getView(viewName: MenuOptions){
    switch (viewName) {
      /* Users */
      case MenuOptions.UsersList: return <UsersList/>;
      case MenuOptions.CreateUser: return <CreateUser/>;
      case MenuOptions.UserEdit: return <UserEdit/>;

      /* Degrees */
      case MenuOptions.DegreeList: return <DegreesList/>;
      case MenuOptions.CreateDegree: return <CreateDegree/>;
      case MenuOptions.DegreeEdit: return <DegreeEdit/>;

      /* Courses */
      case MenuOptions.CreateCourse: return <CreateCourse/>;
      case MenuOptions.CoursesList: return <CourseList/>;
      case MenuOptions.CourseEdit: return <CourseEdit />
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
