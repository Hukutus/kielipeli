import React, {Component} from "react";
import firestore from "../javascripts/firebase";
import Timer from "./Timer";

const docRef = "assignments/wordplay/wordpairs";

const initialState = {
  showTimer: true,
  currentIndex: 0,
  currentWord: {fi: "", en: "", id: ""},
  wordpairs: [],
  shuffledWords: [],
  selectionClass: "",
  maxLives: 5,
  remainingLives: 5,
  showGameOver: false,
  showCorrect: false
};

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

      this.setState({
        shuffledPairs: this.shuffleArray(_wordpairs),
        wordpairs: _wordpairs,
        currentWord: _wordpairs[0]
      });
    });
  }

  resetState() {
    this.setState(prevState => ({
      ...initialState,
      wordpairs: prevState.wordpairs,
      shuffledPairs: this.shuffleArray(prevState.wordpairs),
      currentWord: prevState.wordpairs[0]
    }));
  }

  onTimerEnd() {
    this.setState({"showTimer": false});
  }

  confirmMatch() {
    if (this.state.showGameOver || this.state.showCorrect) {
      return;
    }

    this.setState({showCorrect: true});

    setTimeout(() => {
      this.setState(prevState => ({
        shuffledPairs: this.shuffleArray(prevState.wordpairs),
        currentWord: prevState.wordpairs[++prevState.currentIndex],
        currentIndex: ++prevState.currentIndex,
        showCorrect: false
      }));
    }, 2000);
  }

  onMismatch() {
    if (this.state.showGameOver || this.state.showCorrect) {
      return;
    }

    this.setState(prevState => {
      if (prevState.remainingLives === 1) {
        return {
          remainingLives: --prevState.remainingLives,
          showGameOver: true
        };
      }

      return {
        remainingLives: --prevState.remainingLives
      };
    });
  }

  shuffleArray(array) {
    let currentRandomiseIndex = array.length, temporaryValue, randomIndex;
    const arrayClone = array.slice(0);

    // While there remain elements to shuffle...
    while (0 !== currentRandomiseIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentRandomiseIndex);
      currentRandomiseIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arrayClone[currentRandomiseIndex];
      arrayClone[currentRandomiseIndex] = arrayClone[randomIndex];
      arrayClone[randomIndex] = temporaryValue;
    }

    return arrayClone;
  }

  render() {
    return (
      <div className={"App"}>
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
                             showGameOver={this.state.showGameOver}
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
                <button className={"gameOverButton"} onClick={() => this.resetState()}>Try again</button>
              </div> :
              ""
            }
          </div>
        </div>

        {this.state.showCorrect ? <div className={"successPopUp"}>Correct!</div> : "" }
        {this.state.showGameOver ? <div className={"failurePopUp"}>Game over!</div> : "" }
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
    if (this.props.showGameOver) {
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
}

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

