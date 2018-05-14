import React, { Component } from 'react';
import {User} from './User';
import Assignment from "./Assignment";
import Link from "react-router-dom/es/Link";
import firestore from "../javascripts/firebase";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      assignments: []
    };

    this.testArray = [1, 2, 3, "Kakke", "Perunaaa"];

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  componentDidMount() {
    firestore.collection("assignments").onSnapshot(snapshot => {
      const _assignments = snapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      })
      this.setState({assignments: _assignments});
    })
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
                this.state.assignments.map(assignment => {
                  return (
                      <Link key={assignment.id} to={assignment.url}>
                          <button className="Landing-assignment-button">{assignment.name}</button>
                      </Link>
                      );
                })
              }
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
