import React,{Component} from "react";
import {DegreeCard} from "./degree-card/degree-card";
import "./home.scss";

interface HomePageState {
  degrees:any[];
}


export class HomePage extends Component<{},HomePageState>{





  constructor(props:any){
    super(props);
    this.state = {
      degrees: [
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6}
      ]
    }

  }


/*
  degreesList(){
    return this.state.degrees.map(degree => <DegreeCard id={degree.id}/>)
  }
*/
  render(){


    const degreesList = this.state.degrees.map(degree => <DegreeCard key={degree.id} id={degree.id}/>);

    return (
      <div className="home-page">
        <h2 className="home-title">Welcome to Jschool</h2>
        <p className="home-description">The best School in the best location</p>
        <div className="home-body">
          {degreesList}
        </div>
      </div>
    )
  }
}
