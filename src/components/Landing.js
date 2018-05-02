import React, { Component } from 'react';
import {User} from './User';
import Assignment from "./Assignment";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.testArray = [1, 2, 3, "Kakke", "Perunaaa"];

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }

  render () {
    return (
      <div className="Landing-body">
        <div className="Landing-border">
          <div className="Landing-header">
            <h1>Welcome to WordPlay</h1>
          </div>

          <div className="Landing-assignment-selection">
              {
                this.testArray.map(item => {
                  return (
                      <button className="Landing-assignment-button">{item}</button>
                  );
                })
              }
          </div>

          {/*<form>*/}
            {/*<input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>*/}
            {/*<User username={this.state.username} password={this.state.password} />*/}
            {/*<Assignment/>*/}

            {/*<button className="btn btn-success">Testi</button>*/}
          {/*</form>*/}
        </div>
      </div>
    )
  }
}

export default Landing
