import React from "react";
import {Table} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {Degree} from "../../types/types";

interface DegreesListProps {
  rootStore?: RootStore
}


@inject("rootStore")
@observer
export class DegreesList extends React.Component<DegreesListProps,{}>{

  degreesStore = this.props.rootStore.degreesStore;

  componentDidMount(){
    this.degreesStore.fetchDegrees();
  }

  degreesRows(){

    const degrees = this.degreesStore.degrees || [];
    const degreesList = degrees.map((degree:Degree) => {
      return (
        <Table.Row key={degree.id}>
          <Table.Cell>{degree.id}</Table.Cell>
          <Table.Cell>{degree.name}</Table.Cell>
          <Table.Cell>{degree.description}</Table.Cell>
        </Table.Row>
      );
    });
    return degreesList;
  }




  render(){
    return (
      <div>
        <h4>Degrees List</h4>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.degreesRows()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
