import React, { Component } from "react";
import firestore from "../javascripts/firebase";

const colRef = "assignments/storypicture/pairs";

class Storypicture extends Component {
  constructor() {
    super();
    this.state = {
      pairs: [],
      selectedStoryId: "",
      selectedPictureId: ""
    };
    this.selectPicture = this.selectPicture.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
  }

  componentDidMount() {
    firestore.collection(colRef).onSnapshot(snapshot => {
      const _pairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ pairs: _pairs });
    });
  }

  selectStory(id) {
    if (id === this.state.selectedStoryId) {
      this.setState({ selectedStoryId: "" });
    } else {
      this.setState({ selectedStoryId: id }, () => {
        this.checkIfRight();
      });
    }
  }

  selectPicture(id) {
    if (id === this.state.selectedPictureId) {
      this.setState({ selectedPictureId: "" });
    } else {
      this.setState({ selectedPictureId: id }, () => {
        this.checkIfRight();
      });
    }
  }

  checkIfRight() {
    const { selectedPictureId, selectedStoryId } = this.state;
    if (selectedPictureId !== "" && selectedStoryId !== "") {
      if (selectedPictureId === selectedStoryId) {
        this.handleCorrect();
      } else {
        this.handleWrong();
      }
    } else {
      return;
    }
  }

  handleCorrect() {
    alert("Correct!");
  }

  handleWrong() {
    alert("Wrong!");
    this.setState({ selectedPictureId: "" });
    this.setState({ selectedStoryId: "" });
  }

  render() {
    return <div className="Landing-body">
        <div className="Landing-border">
          <div className="Landing-header">
            <h1>Storypicture</h1>
            <h3>Connect matching story and picture</h3>
          </div>
          <div className="StorypictureContainer">
            <Pictures {...this.state} selectPicture={this.selectPicture} />
            <Stories {...this.state} selectStory={this.selectStory} />
          </div>
        </div>
      </div>;
  }
}

export default Storypicture;

const Pictures = ({ pairs, selectPicture, selectedPictureId }) => {
  return (
    <div className="Storypicture-pictures">
      {pairs.map(pair => {
        return (
          <div key={pair.id} onClick={() => selectPicture(pair.id)}>
            <img src={pair.pictureUrl} className="Storypicture-picture" />
          </div>
        );
      })}
    </div>
  );
};

const Stories = ({ pairs, selectStory, selectedStoryId }) => {
  const suffled = shuffleArray(pairs);
  return (
    <div className="Storypicture-stories">
      {suffled.map(pair => {
        return (
          <div key={pair.id} onClick={() => selectStory(pair.id)}>
            {pair.id !== selectedStoryId ? (
              <p>{pair.story}</p>
            ) : (
              <b>{pair.story}</b>
            )}
          </div>
        );
      })}
    </div>
  );
};

const shuffleArray = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
};
