import React, { Component } from 'react';
import {User} from './User';
import Assignment from "./Assignment";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      testAssignment: {
        sentence: "Tämä on ensimmäinen lause.",
        words: ["This", "is", "the first", "sentence"],
        extra: ["That", "Them", "are", "dogs", "last", "were", "words", "dog"]
      },
      selectedWords: "",
      tempIndex: 0
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }

  render () {
    return (
      <div>
        <h1>Welcome!</h1>
        <form>
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
          <User username={this.state.username} password={this.state.password} />
          <Assignment testAssignment={this.state.testAssignment} selectedWords={this.state.selectedWords} tempIndex={this.state.tempIndex} />
        </form>
      </div>
    )
  }
}

export default Landing
