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
        <div className="Landing-body">
            <div className="Landing-border">
                <div className="Landing-header">
                    <h1>Wordplay</h1>
                </div>

                <div>
                  Content
                </div>
            </div>
        </div>
    );
  }
}

export default Wordplay;
