import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Landing from './Landing';
import Assignment from './Assignment';

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/assignment' component={Assignment} />
          </Switch>
        </BrowserRouter>
    </div>
    )
  }
}

export default App;
