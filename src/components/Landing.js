import React, { Component } from 'react';
import {User} from './User';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(e) {
    console.log(e.target.value)
    this.setState({username: e.target.value});
  }

  render () {
    return (
      <div>
        <h1>Welcome!</h1>
        <form>
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
          <User username={this.state.username} password={this.state.password} />
        </form>
      </div>
    )
  }
}

export default Landing
