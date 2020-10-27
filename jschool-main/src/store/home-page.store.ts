import {observable,computed,action} from "mobx";
import axios, {AxiosResponse} from "axios";
import {DegreeModel} from "../types";

export class HomePageStore {


  @observable
  public degrees: DegreeModel[] = [];



  @action.bound
  setDegrees(degrees:DegreeModel[]){
    this.degrees = degrees;
  }

  async fetchDegrees(){
    const res: AxiosResponse<DegreeModel[]> = await axios.get("degrees/images");
    this.setDegrees(res.data);


  }
}
