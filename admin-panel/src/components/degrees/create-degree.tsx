import React from "react";
import {Button,Form} from "semantic-ui-react";
import {RootStore} from "../../store/root-store";
import {inject, observer} from "mobx-react";


interface CreateDegreeProps {
  rootStore?: RootStore;
}


@inject("rootStore")
@observer
export class CreateDegree extends React.Component<CreateDegreeProps,{}> {

  render() {
    const degreesStore = this.props.rootStore.degreesStore;
    return (
      <div>
        <h3>Create Degree</h3>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              value={degreesStore.name}
              onChange={event => degreesStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              value={degreesStore.description}
              onChange={event => degreesStore.setDescription(event.target.value)}
              placeholder="Description"
              type="text"
            />
          </Form.Field>


          <Button
            type="submit"
            onClick={event => degreesStore.createDegree(event)}>Save
          </Button>
        </Form>
      </div>
    )
  }
}
