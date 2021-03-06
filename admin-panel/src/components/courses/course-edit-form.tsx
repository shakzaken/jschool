import React from "react";
import {Button,Form} from "semantic-ui-react";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";


interface CourseEditFormProps {
  rootStore?:RootStore;
}

@inject("rootStore")
@observer
export class CourseEditForm extends React.Component<CourseEditFormProps,{}> {


  render() {
    const coursesEditStore = this.props.rootStore.coursesStore.courseEditStore;
    const course = coursesEditStore.course;
    return (
      <div>
        <h3>Edit Course Form</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              value={course.name}
              onChange={event => coursesEditStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              value={course.description}
              onChange={event => coursesEditStore.setDescription(event.target.value)}
              placeholder="Description"
              type="text"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={event => coursesEditStore.updateCourse(event)}>Save
          </Button>
        </Form>
      </div>
    )
  }
}
