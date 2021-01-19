import {action, observable} from "mobx";

export enum MessageType{

  HIDDEN,
  SUCCESS,
  ERROR
}

export class MessageStore {

  @observable
  public type : MessageType = MessageType.HIDDEN;

  @observable
  public content : string = "";

  @observable
  private messageLock: boolean = false;


  @action.bound
  private setType(type: MessageType){
    this.type = type;
  }

  @action.bound
  private setContent(content: string){
    this.content = content;
  }

  @action.bound
  private setMessageLock(lock : boolean){
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
