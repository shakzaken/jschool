import React,{Component} from "react";
import image from "./computer.jpg";
import "./degree-card.scss";
import {Link} from "react-router-dom";

interface DegreeCardProps {
  id:number;
}
export class DegreeCard extends Component<DegreeCardProps,{}>{

  render(){
    const linkPath = `degree/${this.props.id}`;

    return <div className="degree-card">
      <img src={image} alt="image"/>
      <div className="degree-card-body">
        <p className="degree-card-body-title">
          Computer science
        </p>
        <div className="degree-card-body-link">
          <Link to={linkPath}>More Info</Link>
        </div>
      </div>
    </div>
  }
}
