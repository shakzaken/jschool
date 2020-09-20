import React from "react";
import {Course, MenuOptions} from "../../types/types";
import {Icon, Table} from "semantic-ui-react";
import {RootStore} from "../../store/root-store";
import {inject, observer} from "mobx-react";


export interface CourseListProps {
  rootStore?: RootStore;
}


@inject("rootStore")
@observer
export class CourseList extends React.Component<CourseListProps,{}>{


  coursesStore = this.props.rootStore.coursesStore;
  rootStore = this.props.rootStore;
  componentDidMount(){
    this.coursesStore.fetchCourses();
  }

  onCourseEditSelect(course:Course){
    this.coursesStore.setCourseEdit(course);
    this.rootStore.setActiveMenu(MenuOptions.CourseEdit);
  }



  coursesRows(){
    const courses = this.coursesStore.courses || [];
    const coursesList = courses.map((course:Course) => {
      return (
        <Table.Row key={course.id}>
          <Table.Cell>{course.id}</Table.Cell>
          <Table.Cell>{course.name}</Table.Cell>
          <Table.Cell>{course.description}</Table.Cell>
          <Table.Cell className="edit-icon">
              <Icon name="edit"
                onClick={(event:any) => this.onCourseEditSelect(course)}/>
          </Table.Cell>
          <Table.Cell className="delete-icon">
            <Icon name="delete" onClick={(event:any) => this.coursesStore.deleteCourse(course)}/>
          </Table.Cell>

        </Table.Row>
      );
    });
    return coursesList;
  }



  render(){
    return (
      <div>
        <h4>Courses List</h4>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Edit Course</Table.HeaderCell>
              <Table.HeaderCell>Delete Course</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.coursesRows()}
          </Table.Body>
        </Table>
      </div>
    );
  }

}
