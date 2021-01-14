import React,{Component} from "react";
import {Comment} from "semantic-ui-react";
import avatar from "./avatar.png";

interface CommentProps {
  text:string;
  date:string;
  userName:string;
}

export class JComment extends Component<CommentProps,{}> {




  render(){
    const {text,date,userName} = this.props;
    return (
      <Comment>
        <Comment.Avatar src={avatar} />
        <Comment.Content>
          <Comment.Author as='a'>{userName}</Comment.Author>
          <Comment.Metadata>
            <div>{date}</div>
          </Comment.Metadata>
          <Comment.Text>{text}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}
