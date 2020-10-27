import React,{Component} from "react";
import "./degree-card.scss";
import {Link} from "react-router-dom";

interface DegreeCardProps {
  id:number;
  image:string;
  name:string;
}
export class DegreeCard extends Component<DegreeCardProps,{}>{

  render(){
    const linkPath = `degree/${this.props.id}`;
    const imageSrc = "data:image/png;base64,"+this.props.image;
    return <div className="degree-card">
      <img src={imageSrc} alt="image"/>
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
