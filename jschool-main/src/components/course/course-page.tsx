import React, {ChangeEvent, Component} from "react";
import "./course-page.scss";
import {Form,Button,Comment} from "semantic-ui-react";
import avatarImage from "./avatar.png";
import {JComment} from "../comment/comment";
import JavaImage from "./java3.jpeg";


interface CoursePageProps {
    match: any;
}

interface CoursePageState {
  comments: CommentModel[];
  formComment:string;
}

interface CommentModel {
  name:string;
  date:string;
  image:any;
  text:string;
}



export class CoursePage extends Component<CoursePageProps,CoursePageState>{


    constructor(props: CoursePageProps){
      super(props);
      this.state = {
        comments:[
          {
            name:"Shak",
            date: "22-10-2020",
            image: avatarImage,
            text: "This is the best course. Deeply recommended! "
          },
          {
            name:"Shak",
            date: "22-10-2020",
            image: avatarImage,
            text: "This is the best course. Deeply recommended! "
          },
          {
            name:"Shak",
            date: "22-10-2020",
            image: avatarImage,
            text: "This is the best course. Deeply recommended! "
          }
        ],
        formComment:""
      };
      this.onCommentChange = this.onCommentChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(value:any){
      const newComment: CommentModel = {
        name:"shak",
        date: new Date().toLocaleDateString(),
        image: avatarImage,
        text: this.state.formComment
      };
      const comments = this.state.comments;
      comments.push(newComment);
      this.setState({comments});
    }
    onCommentChange(event: ChangeEvent<HTMLTextAreaElement> ){
      this.setState({formComment:event.target.value});
    }

    commentsComponents(){
      return this.state.comments.map(comment =>
        <JComment text={comment.text}
          date={comment.date}
          userImage={comment.image}
          userName={comment.name}
        />
      );
    }




    render(){
      return (
        <div className="course-page">
          <h2 className="course-page-title">Java for Experts</h2>
          <div className="course-page-main-image">
            <img src={JavaImage}></img>
          </div>

          <div className="comments-section">
            <p className="comments-title">Comments</p>
            <Comment.Group>
              {this.commentsComponents()}
            </Comment.Group>
            <Form reply onSubmit={(value) => this.onSubmit(value)}>
              <Form.TextArea value={this.state.formComment} onChange={this.onCommentChange}  />
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          </div>

        </div>
      );
    }



}
