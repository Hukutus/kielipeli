import React, { Component } from "react";
import firestore from "../javascripts/firebase";

const colRef = "assignments/storypicture/pairs";

class Storypicture extends Component {
  constructor() {
    super();
    this.state = {
      pairs: []
    };
  }

  componentDidMount() {
    firestore.collection(colRef).onSnapshot(snapshot => {
      const _pairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ pairs: _pairs });
    });
  }
  render() {
    return (
      <div>
        <h1>Storypicture</h1>
      </div>
    );
  }
}

export default Storypicture;
