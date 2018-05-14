import React, { Component } from "react";
import firestore from "../javascripts/firebase";

const docRef = "assignments/wordplay/wordpairs";

class Wordplay extends Component {
  constructor() {
    super();
    this.state = {
      wordpairs: []
    };
  }

  componentDidMount() {
    firestore.collection(docRef).onSnapshot(snapshot => {
      const _wordpairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ wordpairs: _wordpairs });
    });
  }

  render() {
    return (
      <div>
        <h1>Wordplay</h1>
      </div>
    );
  }
}

export default Wordplay;
