import React, { Component } from 'react';
import {User} from './User';
import Assignment from "./Assignment";
import Link from "react-router-dom/es/Link";

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

  openAssignment(index) {
    console.log("Should open assignment", index);
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
                this.testArray.map((item, index) => {
                  return (
                      <Link to="/assignment">
                          <button className="Landing-assignment-button" onClick={() => this.openAssignment(index)}>{item}</button>
                      </Link>
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
