import {CreateDegreeDto, Degree} from "../types/types";
import {action, observable} from "mobx";
import {MessageStore, MessageType} from "./message-store";
import axios, {AxiosResponse} from "axios";

export class DegreesStore {




  @observable
  degrees:Degree[];


  @observable
  degreeEdit: Degree;

  @observable
  name:string;

  @observable
  description:string;


  messageStore : MessageStore;

  constructor(messageStore : MessageStore){
    this.messageStore = messageStore;
  }





  @action.bound
  setDegrees(degrees:Degree[]){
    this.degrees = degrees;
  }

  @action.bound
  setName(name:string){
    this.name = name;
  }

  @action.bound
  setDescription(description: string){
    this.description = description;
  }

  @action.bound
  setDegreeEdit(degree: Degree){
    this.degreeEdit = degree;
  }

  @action.bound
  removeDegree(degree:Degree){
    //@ts-ignore
    this.degrees.remove(degree);
  }


  async fetchDegrees(){
    try{
      const result : AxiosResponse<Degree[]> = await axios.get("degrees");
      this.setDegrees(result.data);
    }catch(err){
      console.error("Failed to fetch degrees list");
    }
  }

  async createDegree(event: any){

    event.preventDefault();
    const degree: CreateDegreeDto = {
      name: this.name,
      description: this.description
    };
    try{
      await axios.post("degrees",degree);
      this.messageStore.displayMessage("Degree Created Successfully",MessageType.SUCCESS);
    }catch(err){
      this.messageStore.displayMessage("Degree Creation Failed",MessageType.ERROR);
    }
  }

  public async deleteDegree(degree: Degree){
    try{
      await axios.delete(`degrees/${degree.id}`);
      this.removeDegree(degree);
      this.messageStore.displayMessage(`Degree ${degree.name} deleted successfully`,MessageType.SUCCESS);

    }catch(err){
      this.messageStore.displayMessage("Delete Operation Failed",MessageType.ERROR);
    }
  }

}
