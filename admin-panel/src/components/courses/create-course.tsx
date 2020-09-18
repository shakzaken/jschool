import React from "react";
import {Button,Form} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root-store";


interface CreateCourseProps {
  rootStore?: RootStore;
}


@inject("rootStore")
@observer
export class CreateCourse extends React.Component<CreateCourseProps,{}>{

  render() {
    const coursesStore = this.props.rootStore.coursesStore;
    return (
      <div>
        <h3>Create Course</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              value={coursesStore.name}
              onChange={event => coursesStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              value={coursesStore.description}
              onChange={event => coursesStore.setDescription(event.target.value)}
              placeholder="Description"
              type="text"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={event => coursesStore.createCourse(event)}>Save
          </Button>
        </Form>
      </div>
    )
  }
}
