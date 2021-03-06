import React from "react";
import {Message} from "semantic-ui-react";
import {observer,inject} from "mobx-react";
import {MessageStore} from "../../../store/message-store";
import {MessageType} from "../../../store/message-store";
import {RootStore} from "../../../store/root-store";

interface JMessageProps {
  rootStore?:RootStore
}


@inject("rootStore")
@observer
export class JMessage extends React.Component<JMessageProps,{}> {

  constructor(props: any){
    super(props);
  }


  render(){
    const messageStore = this.props.rootStore.messageStore;
    return (
      <Message
        hidden={messageStore.type === MessageType.HIDDEN}
        visible={messageStore.type !== MessageType.HIDDEN}
        success={messageStore.type === MessageType.SUCCESS}
        error={messageStore.type === MessageType.ERROR}>
        <Message.Header>{messageStore.content}</Message.Header>
      </Message>
      )


  }

}
