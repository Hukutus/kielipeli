import React, {Component} from "react";
import firestore from "../javascripts/firebase";
import Timer from "./Timer";

const docRef = "assignments/wordplay/wordpairs";

const initialState = {
  showTimer: true,
  currentIndex: 0,
  currentWord: {},
  wordpairs: [],
  selectionClass: "",
  maxLives: 5,
  remainingLives: 5,
  showGameOver: false
}

class Wordplay extends Component {
  constructor() {
    super();

    this.state = initialState;

    this.onTimerEnd = this.onTimerEnd.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.confirmMatch = this.confirmMatch.bind(this);
    this.onMismatch = this.onMismatch.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    firestore.collection(docRef).onSnapshot(snapshot => {
      const _wordpairs = snapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      });

      this.setState({wordpairs: this.shuffleArray(_wordpairs), currentWord: this.shuffleArray(_wordpairs)[0]});
    });
  }

  resetState() {
    this.setState(initialState);

    firestore.collection(docRef).onSnapshot(snapshot => {
      const _wordpairs = snapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      });

      this.setState({wordpairs: this.shuffleArray(_wordpairs), currentWord: this.shuffleArray(_wordpairs)[0]});
    });
  }

  onTimerEnd() {
    this.setState({"showTimer": false});
  }

  confirmMatch() {
    if (this.state.showGameOver) {
      return;
    }

    let newWord = this.shuffleArray(this.state.wordpairs)[0];
    while (this.state.currentWord.id === newWord.id) {
      newWord = this.shuffleArray(this.state.wordpairs)[0];
    }

    this.setState({
      wordpairs: this.shuffleArray(this.state.wordpairs),
      currentWord: newWord
    });
  }

  onMismatch() {
    if (this.state.showGameOver) {
      return;
    }

    this.setState(prevState => {
      if (prevState.remainingLives === 1) {
        return {
          remainingLives: --prevState.remainingLives,
          showGameOver: true
        };
      }

      return {remainingLives: --prevState.remainingLives};
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
                    <Words currentWord={this.state.currentWord} pair={wordPair}
                           gameOverStatus={this.state.showGameOver}
                           key={wordPair.id} confirmMatch={this.confirmMatch}
                           onMismatch={this.onMismatch}
                    />
                  );
                })}
              </div>

              <LifePoints maxLives={this.state.maxLives} remainingLives={this.state.remainingLives} />
            </div>
          }

          {this.state.showGameOver ?
            <div className={"gameOverContainer"}>
              Game over

              <button className={"gameOverButton"} onClick={() => this.resetState()}>Try again</button>
            </div> :
            ""
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
    if (this.props.gameOverStatus) {
      return;
    }

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

      this.props.onMismatch();
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

const LifePoints = (({maxLives, remainingLives}) => {
  return (
    <div className={"LivesContainer"}>
      {new Array(maxLives).fill(null).map((unneeded, index) => {
        return (
          <div className={remainingLives > index ? "heart filled" : "heart"} key={index + "_life"}></div>
        );
      })}
    </div>
  );
});

