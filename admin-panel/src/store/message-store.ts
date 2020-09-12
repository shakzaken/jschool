import {action, observable} from "mobx";

export enum MessageType{

  HIDDEN,
  SUCCESS,
  ERROR
}

export class MessageStore {

  @observable
  type : MessageType = MessageType.HIDDEN;

  @observable
  content : string = "";

  @observable
  messageLock: boolean = false;


  @action.bound
  setType(type: MessageType){
    this.type = type;
  }

  @action.bound
  setContent(content: string){
    this.content = content;
  }

  @action.bound
  setMessageLock(lock : boolean){
    this.messageLock = lock;
  }


  public displayMessage(content:string,type:MessageType){
    if(this.messageLock === false){
      this.setMessageLock(true);
      this.setContent(content);
      this.setType(type);
      setTimeout(() => {
        this.setContent("");
        this.setType(MessageType.HIDDEN);
        this.messageLock = false;
      },3000);
    }
  }
}
