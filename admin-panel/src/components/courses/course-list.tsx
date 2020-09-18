import React from "react";
import {Course, Degree} from "../../types/types";
import {Table} from "semantic-ui-react";
import {RootStore} from "../../store/root-store";
import {inject, observer} from "mobx-react";


export interface CourseListProps {
  rootStore?: RootStore;
}


@inject("rootStore")
@observer
export class CourseList extends React.Component<CourseListProps,{}>{


  coursesStore = this.props.rootStore.coursesStore;

  componentDidMount(){
    this.coursesStore.fetchCourses();
  }

  coursesRows(){

    const courses = this.coursesStore.courses || [];
    const coursesList = courses.map((course:Course) => {
      return (
        <Table.Row key={course.id}>
          <Table.Cell>{course.id}</Table.Cell>
          <Table.Cell>{course.name}</Table.Cell>
          <Table.Cell>{course.description}</Table.Cell>
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
