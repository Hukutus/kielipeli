import React, { Component } from "react";
import firestore from "../../javascripts/firebase";

const docRef = "assignments/wordplay/wordpairs";

class WordplayConfig extends Component {
  constructor() {
    super();
    this.state = {
      wordpairs: [],
      newPair: {
        fi: "",
        en: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPair = this.addPair.bind(this);
  }

  componentDidMount() {
    firestore
      .collection(docRef)
      .onSnapshot(snapshot => {
        const _wordpairs = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        this.setState({ wordpairs: _wordpairs });
      });
  }

  async addPair() {
    try {
    await firestore
      .collection(docRef)
      .add(this.state.newPair);
      this.setState({newPair: {fi: '', en: ''}})
    } catch(err) {

    }
  }

  deletePair(id) {
    firestore
      .collection(docRef)
      .doc(id)
      .delete()
  }

  handleChange(e) {
    let _newPair = { ...this.state.newPair };
    _newPair[e.target.name] = e.target.value;
    this.setState({ newPair: _newPair });
  }
  render() {
    return (
      <div>
        <h1>Configure Word Play assignment</h1>
        <WordTable
          wordpairs={this.state.wordpairs}
          deletePair={this.deletePair}
          addPair={this.addPair}
          handleChange={this.handleChange}
          newPair={this.state.newPair}
        />
      </div>
    );
  }
}

export default WordplayConfig;

const WordTable = ({
  wordpairs,
  addPair,
  deletePair,
  handleChange,
  newPair
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>FI</th>
          <th>EN</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {wordpairs.map(pair => {
          return (
            <tr key={pair.id}>
              <td>{pair.fi}</td>
              <td>{pair.en}</td>
              <td>
                <button onClick={() => deletePair(pair.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>
            <input
              type="text"
              name="fi"
              placeholder="FI"
              onChange={handleChange}
              value={newPair.fi}
            />
          </td>
          <td>
            <input
              type="text"
              name="en"
              placeholder="EN"
              onChange={handleChange}
              value={newPair.en}
            />
          </td>
          <td>
            <button onClick={addPair}>Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
