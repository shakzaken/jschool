import React,{Component} from "react";
import {DegreeCard} from "./degree-card/degree-card";
import "./home.scss";
import {observer,inject} from "mobx-react";
import {RootStore} from "../../store/root.store";
import {History} from "history";
interface HomePageState {
  degrees:any[];
}


interface HomePageProps {
  rootStore?:RootStore;
  history: History;
}

@inject("rootStore")
@observer
export class HomePage extends Component<HomePageProps,HomePageState>{

  store = this.props.rootStore.homePageStore;
  authStore = this.props.rootStore.authStore;

  componentDidMount(){
    if(this.authStore.isLoggedIn){
        this.store.fetchDegrees();
    }else{
        this.props.history.push("/login");
    }

  }



  degreesList(){
    return this.store.degrees.map(degree =>
      <DegreeCard
        image={degree.degreeImages[0].image}
        key={degree.id}
        id={degree.id}
        name={degree.name}
        />)
  }

  render(){



    return (
      <div className="home-page">
        <h2 className="home-title">Welcome to Jschool</h2>
        <p className="home-description">The best School in the best location</p>
        <div className="home-body">
          {this.degreesList()}
        </div>
      </div>
    )
  }
}
