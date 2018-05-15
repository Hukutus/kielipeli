import React, {Component} from "react";
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
      wordpairs: [],
      selectionClass: ""
    };

    this.onTimerEnd = this.onTimerEnd.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.confirmMatch = this.confirmMatch.bind(this);
  }

  componentDidMount() {
    firestore.collection(docRef).onSnapshot(snapshot => {
      const _wordpairs = snapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      });

      const shuffledWords = this.shuffleArray(_wordpairs);

      this.setState({wordpairs: shuffledWords, currentWord: this.shuffleArray(shuffledWords)[0]});
    });
  }

  onTimerEnd() {
    this.setState({"showTimer": false});
  }

  confirmMatch() {
    this.setState({
      wordpairs: this.shuffleArray(this.state.wordpairs),
      currentWord: this.shuffleArray(this.state.wordpairs)[0]
    });
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    const arrayClone = array.slice(0);

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arrayClone[currentIndex];
      arrayClone[currentIndex] = arrayClone[randomIndex];
      arrayClone[randomIndex] = temporaryValue;
    }

    return arrayClone;
  }

  render() {
    return (
      <div className="Landing-body">
        <div className="Landing-border">
          <div className="Landing-header">
            <h1>Wordplay</h1>
          </div>


          {!this.state.showTimer ?
            <div className="TimerContainer">
              <Timer onTimerEnd={this.onTimerEnd} timerSeconds={3}></Timer>
            </div> :
            <div>
              <div>
                <div className={"instructions"}>Select the correct pair for the given word!</div>
                <div className={"titleWord"}>{this.state.currentWord.en}</div>
              </div>

              <div className={"wordArea"}>
                {this.state.wordpairs.map(wordPair => {
                  return (
                    <Words currentWord={this.state.currentWord} pair={wordPair} key={wordPair.id} confirmMatch={this.confirmMatch}/>
                  );
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

class Words extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusClass: ""
    };

    this.checkWordMatch = this.checkWordMatch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentWord.id !== this.props.currentWord.id) {
      this.setState({statusClass: ""});
    }
  }

  checkWordMatch(wordId) {
    if (wordId === this.props.currentWord.id) {
      this.setState({
        statusClass: "wordMatch"
      });

      this.props.confirmMatch();
    }
    else {
      this.setState({
        statusClass: "wordMismatch"
      });
    }
  }

  render() {
    return (
      <div className={"matchWord " + this.state.statusClass} onClick={() => this.checkWordMatch(this.props.pair.id)}>
        {this.props.pair.fi}
      </div>
    );
  }
};
