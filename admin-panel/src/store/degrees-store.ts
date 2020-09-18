import {CreateDegreeDto, Degree} from "../types/types";
import {action, observable} from "mobx";
import {MessageStore, MessageType} from "./message-store";
import axios, {AxiosResponse} from "axios";

export class DegreesStore {




  @observable
  degrees:Degree[];


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

}
