import React,{Component} from "react";
import "./course-card.scss";
import {Link} from "react-router-dom";

interface CourseCardProps {
  id:number;
  image: any;
  name: string;
}
export class CourseCard extends Component<CourseCardProps,{}>{

  render(){
    const linkPath = `/course/${this.props.id}`;

    const {name,image} = this.props;
    const imageSrc = `data:image/png;base64,${image}`;
    return <div className="course-card">
      <img src={imageSrc} alt="image"/>
      <div className="course-card-body">
        <p className="course-card-body-title">
          {name}
        </p>
        <div className="course-card-body-link">
          <Link to={linkPath}>More Info</Link>
        </div>
      </div>
    </div>
  }
}
