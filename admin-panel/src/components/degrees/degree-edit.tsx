import React, {Component} from "react";
import {RootStore} from "../../store/root-store";
import {inject, observer} from "mobx-react";
import {Course, DegreeEditMenuOptions} from "../../types/types";
import {Menu} from "semantic-ui-react";
import {DegreeEditForm} from "./degree-edit-form";
import {DegreeImageEdit} from "./degree-image-edit";
import {DegreeCoursesEdit} from "./degree-courses-edit";

interface DegreeEditProps {
  rootStore?:RootStore;
}


@inject("rootStore")
@observer
export class DegreeEdit extends Component<DegreeEditProps> {


  private degreeEditStore = this.props.rootStore.degreesStore.degreeEditStore;


  renderEditComponent(){
    const menuType : DegreeEditMenuOptions = this.degreeEditStore.menuType;

    switch (menuType) {
      case DegreeEditMenuOptions.EditDegree : return <DegreeEditForm/>;
      case DegreeEditMenuOptions.EditImage : return <DegreeImageEdit/>;
      case DegreeEditMenuOptions.EditCourses : return <DegreeCoursesEdit/>;
    }
  }


  render(){
    const degree : Course = this.degreeEditStore.degree;
    return (
      <div>
        <h2>{degree.name}</h2>
        <Menu fluid widths={3}>
          <Menu.Item
            name="Degree Form"
            onClick={event => this.degreeEditStore.setMenuType(DegreeEditMenuOptions.EditDegree)}
            active={this.degreeEditStore.menuType === DegreeEditMenuOptions.EditDegree}
          />
          <Menu.Item
            name="Degree Image"
            onClick={event => this.degreeEditStore.setMenuType(DegreeEditMenuOptions.EditImage)}
            active={this.degreeEditStore.menuType === DegreeEditMenuOptions.EditImage}
          />
          <Menu.Item
            name="Degree Courses"
            onClick={event => this.degreeEditStore.setMenuType(DegreeEditMenuOptions.EditCourses)}
            active={this.degreeEditStore.menuType === DegreeEditMenuOptions.EditCourses}
          />

        </Menu>
        <div>
          {this.renderEditComponent()}
        </div>
      </div>
    )
  }

}
