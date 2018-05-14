import React, { Component } from "react";
import firestore from "../javascripts/firebase";
import Timer from "./Timer";

const docRef = "assignments/wordplay/wordpairs";

class Wordplay extends Component {
  constructor() {
    super();

    this.state = {
        showTimer: true,
        currentWord: {fi: "Testi", en: "Test"}
    };

    this.onTimerEnd = this.onTimerEnd.bind(this);
  }

  componentDidMount() {
    firestore.collection(docRef).onSnapshot(snapshot => {
      const _wordpairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });

      this.setState({ wordpairs: _wordpairs });
    });
  }

  onTimerEnd() {
    this.setState({ "showTimer": false });
  }

  render() {
    return (
        <div className="Landing-body">
            <div className="Landing-border">
                <div className="Landing-header">
                    <h1>Wordplay</h1>
                </div>


                { !this.state.showTimer ?
                    <div className="TimerContainer">
                        <Timer onTimerEnd={this.onTimerEnd} timerSeconds={3}></Timer>
                    </div> :
                    <div>
                      <div>
                          <div className={"instructions"}>Select the correct pair for the given word!</div>
                          <div className={"titleWord"}>{this.state.currentWord.en}</div>
                      </div>

                      <div className={"wordArea"}>
                        Words appear here
                      </div>

                    </div>
                }
            </div>
        </div>
    );
  }
}

export default Wordplay;
