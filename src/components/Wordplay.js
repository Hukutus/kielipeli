import React, { Component } from "react";
import firestore from "../javascripts/firebase";
import Timer from "./Timer";

const docRef = "assignments/wordplay/wordpairs";

class Wordplay extends Component {
  constructor() {
    super();

    this.state = {
        showTimer: true,
        currentIndex: 0,
        currentWord: {fi: "Testi", en: "Test", id: null},
        wordpairs: []
    };

    this.onTimerEnd = this.onTimerEnd.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    firestore.collection(docRef).onSnapshot(snapshot => {
      const _wordpairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });

      const shuffledWords = this.shuffleArray(_wordpairs);

      this.setState({ wordpairs: shuffledWords, currentWord: this.shuffleArray(shuffledWords)[0] });
    });
  }

  onTimerEnd() {
    this.setState({ "showTimer": false });
  }

  checkWordMatch(wordId) {
    if (wordId === this.state.currentWord.id) {
      this.setState({
          wordpairs: this.shuffleArray(this.state.wordpairs),
          currentWord: this.state.wordpairs[0]
      });
    }
    else {
      console.log("Wrong!");
    }
  }

  shuffleArray(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
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
                          {this.state.wordpairs.map(pair => {
                              return <div className={"matchWord"} key={pair.id}
                                          onClick={() => this.checkWordMatch(pair.id)}
                              >{pair.fi}</div>;
                          })}
                      </div>

                    </div>
                }
            </div>
        </div>
    );
  }
}

export default Wordplay;
