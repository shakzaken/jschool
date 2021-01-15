import React,{Component} from "react";
import {Comment,Icon} from "semantic-ui-react";
import avatar from "./avatar.png";
import "./jcomment.scss";

interface CommentProps {
  text:string;
  date:string;
  userName:string;
  onDelete: Function;
}

export class JComment extends Component<CommentProps,{}> {




  render(){
    const {text,date,userName} = this.props;
    return (
        <div className="j-comment">
          <Comment>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
              <Comment.Author as='a'>{userName}</Comment.Author>
              <Comment.Metadata>
                <div>{date}</div>
              </Comment.Metadata>
              <Comment.Text>{text}</Comment.Text>
            </Comment.Content>
            <Comment.Metadata></Comment.Metadata>
          </Comment>
          <span>
          <Icon onClick={this.props.onDelete} link color="grey"  name='close' />
        </span>
        </div>

    )
  }
}
