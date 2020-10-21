import React, {ChangeEvent, Component} from "react";
import "./degree-page.scss";
import image from "./laptop-image.jpg";
import {Form,Button,Comment} from "semantic-ui-react";
import avatarImage from "./avatar.png";
import {JComment} from "../comment/comment";
import JavaImage from "./java3.jpeg";
import {CourseCard} from "./course-card/course-card";


interface DegreePageProps {
    match: any;
}

interface DegreePageState {
  comments: CommentModel[];
  courses: CourseModel[];
  formComment:string;
}

interface CommentModel {
  name:string;
  date:string;
  image:any;
  text:string;
}

interface CourseModel {
  id:number;
  name:string;
  image:any;
}

export class DegreePage extends Component<DegreePageProps,DegreePageState>{


    constructor(props: DegreePageProps){
      super(props);
      this.state = {
        comments:[
          {
            name:"Shak",
            date: "22-10-2020",
            image: avatarImage,
            text: "This is the best degree. Deeply recommended! "
          },
          {
            name:"Shak",
            date: "22-10-2020",
            image: avatarImage,
            text: "This is the best degree. Deeply recommended! "
          },
          {
            name:"Shak",
            date: "22-10-2020",
            image: avatarImage,
            text: "This is the best degree. Deeply recommended! "
          }
        ],
        courses:[
          {
            id:1,
            name:"Nodejs for pros",
            image:JavaImage,
          },
          {
            id:2,
            name:"React for pros",
            image:JavaImage,
          },
          {
            id:3,
            name:"Vue for pros",
            image:JavaImage,
          },
          {
            id:4,
            name:"Java for beginners",
            image:JavaImage,
          },
          {
            id:5,
            name:"PHP for Masters",
            image:JavaImage,
          },
          {
            id:6,
            name:"Laravel front to back",
            image:JavaImage,
          },

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


    coursesCards(){
      return this.state.courses.map(course =>
        <CourseCard id={course.id} image={course.image} name={course.name}/>
      );

    }

    render(){
      return (
        <div className="degree-page">
          <h2 className="degree-page-title">Computer Science</h2>
          <div className="degree-page-main-image">
            <img src={image}></img>
          </div>


          <div className="courses-cards">

            <p className="title">Courses</p>
            <div className="grid">
              {this.coursesCards()}
            </div>

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
