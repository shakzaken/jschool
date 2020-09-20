import React,{Component} from "react";
import {RootStore} from "../../store/root-store";
import {inject, observer} from "mobx-react";
import {Degree} from "../../types/types";


interface DegreeEditProps {
  rootStore?:RootStore;
}


@inject("rootStore")
@observer
export class DegreeEdit extends Component<DegreeEditProps> {


  render(){
    const degreesStore = this.props.rootStore.degreesStore;
    const degree : Degree = degreesStore.degreeEdit;
    return <div>Degree Edit , Degree id : {degree.id}</div>
  }


  componentWillUnmount(){
    const degreesStore = this.props.rootStore.degreesStore;
    degreesStore.setDegreeEdit(null);
  }

}
