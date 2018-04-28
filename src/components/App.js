import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Landing from './Landing';
import Assignment from './Assignment';

import Configuration from './Configuration';
import WordplayConfig from './configPages/Wordplay';
import StorypictureConfig from './configPages/Storypicture';

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/assignment' component={Assignment} />
              <Route exact path='/configuration' component={Configuration} />
              <Route exact path='/configWordplay' component={WordplayConfig} />
              <Route exact path='/configStorypicture' component={StorypictureConfig} />
          </Switch>
        </BrowserRouter>
    </div>
    )
  }
}

export default App;
