import {CreateDegreeDto, Degree} from "../../types/types";
import {action, observable} from "mobx";
import {MessageStore, MessageType} from "../message-store";
import {DegreeEditStore} from "./degree-edit-store";
import {api} from "../../api/api";

export class DegreesStore {



  degreeEditStore: DegreeEditStore;

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
    this.degreeEditStore = new DegreeEditStore(messageStore);
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
      const degrees = await api.degrees.getAllDegrees();
      this.setDegrees(degrees);
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
      await api.degrees.createDegree(degree);
      this.messageStore.displayMessage("Degree Created Successfully",MessageType.SUCCESS);
    }catch(err){
      this.messageStore.displayMessage("Degree Creation Failed",MessageType.ERROR);
    }
  }

  public async deleteDegree(degree: Degree){
    try{
      await api.degrees.deleteDegree(degree.id);
      this.removeDegree(degree);
      this.messageStore.displayMessage(`Degree ${degree.name} deleted successfully`,MessageType.SUCCESS);

    }catch(err){
      this.messageStore.displayMessage("Delete Operation Failed",MessageType.ERROR);
    }
  }

}
