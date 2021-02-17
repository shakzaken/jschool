import {observable,computed,action} from "mobx";
import {DegreeModel} from "../types";
import {api} from "../api/apiService";

export class HomePageStore {


  @observable
  public degrees: DegreeModel[] = [];




  @action.bound
  setDegrees(degrees:DegreeModel[]){
    this.degrees = degrees;
  }

  async fetchDegrees(){
    const degrees : DegreeModel[] = await api.degrees.getDegrees();
    this.setDegrees(degrees);

  }
}
