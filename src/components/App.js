import React, { Component } from 'react';
import logo from './../logo.svg';
import './App.css';

class App extends Component {
  render() {
      return (
          <div className="App">
              <div className="App-border">
                  <div className="App-header">
                      <h1 style={{'margin-top': '1rem'}}>Kielipeli</h1>
                      <img src={logo} className="App-logo" alt="logo" />
                  </div>
                  <div className="App-content">
                      <h1 className="App-title">Tässä joku lause, jossa sanoja joita opetella.</h1>
                  </div>
                  <div>
                      <div className="Word-item">Testi</div>
                      <div className="Word-item">Testi</div>
                      <div className="Word-item">Testi</div>
                      <div className="Word-item">Testi</div>
                  </div>
              </div>
          </div>
      );
  }
}

export default App;
