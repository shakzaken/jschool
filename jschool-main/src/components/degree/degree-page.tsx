import React,{Component} from "react";
import "./degree-page.scss";
import image from "./laptop-image.jpg";
import {Comment} from "semantic-ui-react";
import avatarImage from "./avatar.png";
import {JComment} from "../comment/comment";


interface DegreePageProps {
    match: any;
}

interface DegreePageState {
  comments: CommentModel[];
}

interface CommentModel {
  name:string;
  date:string;
  image:any;
  text:string;
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
        ]
      };
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
        <div className="degree-page">
          <h2 className="degree-page-title">Computer Science</h2>
          <div className="degree-page-main-image">
            <img src={image}></img>
          </div>
          <div className="comments-section">
            <p>Comments</p>

            <Comment.Group>
              {this.commentsComponents()}
            </Comment.Group>
          </div>

        </div>
      );
    }



}
