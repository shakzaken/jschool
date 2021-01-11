import React from "react";
import {Button,Form,Table,Select,SelectProps} from "semantic-ui-react";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root-store";


interface DegreeCoursesEditProps {
  rootStore?:RootStore;
}

@inject("rootStore")
@observer
export class DegreeCoursesEdit extends React.Component<DegreeCoursesEditProps,{}> {

  private degreeEditStore = this.props.rootStore.degreesStore.degreeEditStore;



  componentDidMount(){
      this.degreeEditStore.fetchDegreeCourses();
  }

  render() {
    const degreesEditStore = this.props.rootStore.degreesStore.degreeEditStore;
    const degree = degreesEditStore.degree;
    
    return (
      <div>
        <h3>Degree Courses</h3>
        <Form>
          <Form.Field>
            <label>Add course</label>
            <input
              value={degree.name}
              onChange={event => degreesEditStore.setName(event.target.value)}
              placeholder="Name"
              type="text"/>

              <Select 
              multiple
              value ={this.degreeEditStore.selecetedCoursesInUi}
              options={this.degreeEditStore.allCoursesInUI}/>
          </Form.Field>
  
          <Button
            type="submit"
            onClick={event => degreesEditStore.updateDegree(event)}>Save
          </Button>
        </Form>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>5</Table.Cell>
              <Table.Cell>nodeJs</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}
