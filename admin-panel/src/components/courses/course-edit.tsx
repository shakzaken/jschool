import React, {Component} from "react";
import {RootStore} from "../../store/root-store";
import {Course, CourseEditMenuOptions} from "../../types/types";
import {inject, observer} from "mobx-react";
import {Menu} from "semantic-ui-react";
import {CourseEditForm} from "./course-edit-form";
import {CourseImageEdit} from "./course-image-edit";

interface CourseEditProps {
  rootStore?:RootStore;
}


@inject("rootStore")
@observer
export class CourseEdit extends Component<CourseEditProps> {

  private courseEditStore = this.props.rootStore.coursesStore.courseEditStore;


  renderEditComponent(){
    const menuType : CourseEditMenuOptions = this.courseEditStore.menuType;

    switch (menuType) {
      case CourseEditMenuOptions.EditCourse : return <CourseEditForm/>;
      case CourseEditMenuOptions.EditImage : return <CourseImageEdit/>;
    }
  }


  render(){
    const course : Course = this.courseEditStore.course;
    return (
     <div>
        <h2>{course.name}</h2>
        <Menu fluid widths={2}>
          <Menu.Item
            name="Course Form"
            onClick={event => this.courseEditStore.setMenuType(CourseEditMenuOptions.EditCourse)}
            active={this.courseEditStore.menuType === CourseEditMenuOptions.EditCourse}
          />
          <Menu.Item
            name="Course Image"
            onClick={event => this.courseEditStore.setMenuType(CourseEditMenuOptions.EditImage)}
            active={this.courseEditStore.menuType === CourseEditMenuOptions.EditImage}
          />

        </Menu>
        <div>
          {this.renderEditComponent()}
        </div>
      </div>
    )
  }


  componentWillUnmount(){
    this.courseEditStore.setCourse(null);
  }

}
