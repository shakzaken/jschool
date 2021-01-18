import React, {ChangeEvent, Component} from "react";
import "./course-page.scss";
import {Form,Button,Comment} from "semantic-ui-react";
import avatarImage from "./avatar.png";
import {JComment} from "../comment/comment";
import JavaImage from "./java3.jpeg";
import {CoursePageStore} from "../../store/course-page.store";
import {RootStore} from "../../store/root.store";
import {inject,observer} from "mobx-react";

interface CoursePageProps {
    match: any;
    rootStore: RootStore;
}

interface CoursePageState {
  comments: CommentModel[];
  formComment:string;
}

interface CommentModel {
  name:string;
  date:string;
  text:string;
}


@inject("rootStore")
@observer
export class CoursePage extends Component<CoursePageProps,CoursePageState>{

    store : CoursePageStore = this.props.rootStore.coursePageStore;

    componentDidMount() {
        console.log(this.props);
        const courseId =  this.props.match.params.id;
        this.store.onPageLoad(courseId)
            .then( res => console.log("success"))
            .catch(err => console.log("failed"));
    }

    constructor(props: CoursePageProps){
      super(props);

      this.onCommentChange = this.onCommentChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(value:any){
      await this.store.createCourseComment();
    }
    onCommentChange(event: ChangeEvent<HTMLTextAreaElement> ){
      this.store.setFormComment(event.target.value);
    }

    commentsComponents(){
      return this.store.comments.map(comment => {
          const commentObj = new Date(comment.date);
         return <JComment text={comment.comment}
                    date={commentObj.toLocaleDateString()}
                    userName={comment.user.name}
                    onDelete={(event:any) => this.store.deleteCourseComment(comment.id)}
          />
      }

      );
    }




    render(){
      return (
        <div className="course-page">
          <h2 className="course-page-title">{this.store.courseName}</h2>
          <div className="course-page-main-image">
            <img src={this.store.courseImageSrc}></img>
          </div>

          <div className="comments-section">
            <p className="comments-title">Comments</p>
            <Comment.Group>
              {this.commentsComponents()}
            </Comment.Group>
            <Form className="comments-body" reply onSubmit={(value) => this.onSubmit(value)}>
              <Form.TextArea value={this.store.formComment} onChange={this.onCommentChange}  />
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          </div>

        </div>
      );
    }



}
