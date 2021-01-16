import React from 'react';
import './App.css';
import {Navbar} from "./components/navbar/navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DegreePage} from "./components/degree/degree-page";
import {HomePage} from "./components/home/home-page";
import {CoursePage} from "./components/course/course-page";
import {Sidebar} from "./components/sidebar/sidebar";
import {LoginPage} from "./components/login/login-page";
import {RegisterPage} from "./components/register/register-page";
import {Provider} from "mobx-react";
import {RootStore} from "./store/root.store";

function App() {
  const store = new RootStore();
  return (
      <div className="App">
        <Provider rootStore={store}>
          <Router>
          <Navbar/>
            <Switch>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/" component={HomePage}/>
              <Route path="/degree/:id" component={DegreePage}/>
              <Route path="/course/:id" component={CoursePage}/>
            </Switch>
          <Sidebar/>
          </Router>
        </Provider>

      </div>
    );
}

export default App;
