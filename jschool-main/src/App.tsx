import React from 'react';
import './App.css';
import {Navbar} from "./components/navbar/navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DegreePage} from "./components/degree/degree-page";
import {HomePage} from "./components/home/home-page";
import {CoursePage} from "./components/course/course-page";
import {Sidebar} from "./components/sidebar/sidebar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/degree/:id" component={DegreePage}/>
          <Route path="/course" component={CoursePage}/>
        </Switch>
      </Router>
      <Sidebar/>
    </div>
  );
}

export default App;
