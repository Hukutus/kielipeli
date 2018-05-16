import React, { Component } from "react";
import firestore from "../javascripts/firebase";

const colRef = "assignments/storypicture/pairs";

class Storypicture extends Component {
  constructor() {
    super();
    this.state = {
      pairs: [],
      selectedStoryId: "",
      selectedPictureId: "",
      pictureList: [],
      storyList: []
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
      this.setState({pictureList: shuffleArray(_pairs)});
      this.setState({storyList: shuffleArray(_pairs)})
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
    this.setState({ selectedPictureId: "" });
    this.setState({ selectedStoryId: "" });
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

const Pictures = ({ pictureList, selectPicture, selectedPictureId }) => {
  return (
    <div className="Storypicture-pictures">
      {pictureList.map(pair => {
        return (
          <div key={pair.id} onClick={() => selectPicture(pair.id)} className={"Storypicture-picture-wrapper " + (selectedPictureId === pair.id ? "selected" : "") }>
            <img src={pair.pictureUrl} className="Storypicture-picture" />
          </div>
        );
      })}
    </div>
  );
};

const Stories = ({ storyList, selectStory, selectedStoryId }) => {
  return (
    <div className="Storypicture-stories">
      {storyList.map(pair => {
        return (
          <div key={pair.id} onClick={() => selectStory(pair.id)} >
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
