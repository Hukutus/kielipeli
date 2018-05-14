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
    this.setState({ selectedStoryId: id }, () => {
      this.checkIfRight();
    });
  }

  selectPicture(id) {
    this.setState({ selectedPictureId: id }, () => {
      this.checkIfRight();
    });
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
    this.setState({selectedPictureId: ''});
    this.setState({selectedStoryId: ''});
  }

  render() {
    return (
      <div>
        <h1>Storypicture</h1>
        <h3>Connect matching story and picture</h3>
        <Pictures pairs={this.state.pairs} selectPicture={this.selectPicture} />
        <Stories pairs={this.state.pairs} selectStory={this.selectStory} />
      </div>
    );
  }
}

export default Storypicture;

const Pictures = ({ pairs, selectPicture }) => {
  return (
    <div>
      {pairs.map(pair => {
        return (
          <div key={pair.id} onClick={() => selectPicture(pair.id)}>
            <img src={pair.pictureUrl} width="300" />
          </div>
        );
      })}
    </div>
  );
};

const Stories = ({ pairs, selectStory }) => {
  return (
    <div>
      {pairs.map(pair => {
        return (
          <div key={pair.id} onClick={() => selectStory(pair.id)}>
            {pair.story}
          </div>
        );
      })}
    </div>
  );
};
