import React,{Component} from "react";
import {Comment} from "semantic-ui-react";


interface CommentProps {
  text:string;
  date:string;
  userImage:any;
  userName:string;
}

export class JComment extends Component<CommentProps,{}> {




  render(){
    const {text,date,userImage,userName} = this.props;
    return (
      <Comment>
        <Comment.Avatar src={userImage} />
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
