import React from "react";
import {Icon, Table} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root-store";
import {Course, Degree, MenuOptions} from "../../types/types";

interface DegreesListProps {
  rootStore?: RootStore
}


@inject("rootStore")
@observer
export class DegreesList extends React.Component<DegreesListProps,{}>{

  degreesStore = this.props.rootStore.degreesStore;
  rootStore = this.props.rootStore;


  componentDidMount(){
    this.degreesStore.fetchDegrees();
  }

  onDegreeEditSelect(degree:Degree){
    this.degreesStore.setDegreeEdit(degree);
    this.rootStore.setActiveMenu(MenuOptions.DegreeEdit);
  }


  degreesRows(){

    const degrees = this.degreesStore.degrees || [];
    const degreesList = degrees.map((degree:Degree) => {
      return (
        <Table.Row key={degree.id}>
          <Table.Cell>{degree.id}</Table.Cell>
          <Table.Cell>{degree.name}</Table.Cell>
          <Table.Cell>{degree.description}</Table.Cell>
          <Table.Cell className="edit-icon">
            <Icon name="edit"
                  onClick={(event:any) => this.onDegreeEditSelect(degree)}/>
          </Table.Cell>
          <Table.Cell className="delete-icon">
            <Icon name="delete" onClick={(event:any) => this.degreesStore.deleteDegree(degree)}/>
          </Table.Cell>
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
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>


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
