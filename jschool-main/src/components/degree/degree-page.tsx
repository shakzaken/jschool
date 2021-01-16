import React, {ChangeEvent, Component} from "react";
import "./degree-page.scss";
import image from "./laptop-image.jpg";
import {Form,Button,Comment} from "semantic-ui-react";
import avatarImage from "../comment/avatar.png";
import {JComment} from "../comment/comment";
import JavaImage from "./java3.jpeg";
import {CourseCard} from "./course-card/course-card";
import {inject,observer} from "mobx-react";
import {RootStore} from "../../store/root.store";
import {DegreePageStore} from "../../store/degree-page.store";

interface DegreePageProps {
    match: any;
    rootStore:RootStore;
}

interface DegreePageState {
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

@inject("rootStore")
@observer
export class DegreePage extends Component<DegreePageProps,DegreePageState>{

    store :DegreePageStore = this.props.rootStore.degreePageStore;

    componentDidMount() {
      const degreeId = this.props.match.params.id;
      this.store.fetchDegreeData(degreeId);
    }

  constructor(props: DegreePageProps){
      super(props);
      this.state = {
        formComment:""
      };
      this.onCommentChange = this.onCommentChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(value:any){
        this.store.saveDegreeComment();
    }
    onCommentChange(event: ChangeEvent<HTMLTextAreaElement> ){
      const comment = event.target.value;
      this.store.setCurrentComment(comment);
    }

    commentsComponents(){
      return this.store.comments.map(comment =>{
          const date = new Date(comment.date);
          return <JComment text={comment.comment}
              key={comment.id}
              date={date.toLocaleDateString()}
              userName={null}
               onDelete={(event:any) => this.store.onCommentDelete(comment.id)}
              />
      });
    }


    coursesCards(){
      return this.store.courses.map(course =>{
        const courseImage = course.courseImages && course.courseImages[0].image;
        return <CourseCard
            key={course.id}
            id={course.id}
            image={courseImage}
            name={course.name}
          />
      });
    }

    render(){
      return (
        <div className="degree-page">
          <h2 className="degree-page-title">{this.store.degree && this.store.degree.name}</h2>
          <div className="degree-page-main-image">
            <img src={this.store.degreeImageSrc}></img>
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
              <Form.TextArea value={this.store.currentComment} onChange={this.onCommentChange}  />
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          </div>
        </div>
      );
    }

}
