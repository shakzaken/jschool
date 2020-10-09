import React from "react";
import {Button,Form} from "semantic-ui-react";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";


interface DegreeEditFormProps {
  rootStore?:RootStore;
}

@inject("rootStore")
@observer
export class DegreeEditForm extends React.Component<DegreeEditFormProps,{}> {


  render() {
    const degreesEditStore = this.props.rootStore.degreesStore.degreeEditStore;
    const degree = degreesEditStore.degree;
    return (
      <div>
        <h3>Edit Course Form</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              value={degree.name}
              onChange={event => degreesEditStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              value={degree.description}
              onChange={event => degreesEditStore.setDescription(event.target.value)}
              placeholder="Description"
              type="text"
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={event => degreesEditStore.updateDegree(event)}>Save
          </Button>
        </Form>
      </div>
    )
  }
}
