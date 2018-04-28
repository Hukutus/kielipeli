import React, { Component } from "react";
import {Link} from 'react-router-dom';
import firestore from "../javascripts/firebase";

import { assignments } from "../javascripts/constants";

class Configuration extends Component {
  constructor() {
    super();

    this.state = {
      assignments: []
    };
  }
  async componentDidMount() {
    const snapshot = await firestore.collection("assignments").get();
    const _assignments = snapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    this.setState({ assignments: _assignments });
  }
  render() {
    return (
      <div>
        <h1>Select assignment you want to configure</h1>
        <ul>
          {this.state.assignments.map(a => {
            return <li key={a.id}><Link to={a.configUrl}>{a.name}</Link></li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Configuration;
