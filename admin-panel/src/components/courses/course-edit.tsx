import React,{Component} from "react";
import {RootStore} from "../../store/root-store";
import {Course} from "../../types/types";
import {inject, observer} from "mobx-react";


interface CourseEditProps {
  rootStore?:RootStore;
}


@inject("rootStore")
@observer
export class CourseEdit extends Component<CourseEditProps> {


  render(){
    const coursesStore = this.props.rootStore.coursesStore;
    const course : Course = coursesStore.courseEdit;
    return <div>courseEdit , courseId : {course.id}</div>
  }


  componentWillUnmount(){
    const coursesStore = this.props.rootStore.coursesStore;
    coursesStore.setCourseEdit(null);
  }

}
