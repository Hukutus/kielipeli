import React, { Component } from "react";
import firestore from "../../javascripts/firebase";

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
  }

  componentDidMount() {
    firestore
      .collection("assignments")
      .doc("wordplay")
      .collection("wordpairs")
      .onSnapshot(snapshot => {
        const _wordpairs = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        this.setState({ wordpairs: _wordpairs });
      });
  }

  addPair() {}

  deletePair() {}

  handleChange(e) {}
  render() {
    return (
      <div>
        <h1>Configure Word Play assignment</h1>
        <WordTable
          wordpairs={this.state.wordpairs}
          deletePair={this.deletePair}
          addPair={this.addPair}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default WordplayConfig;

const WordTable = ({ wordpairs, addPair, deletePair, handleChange }) => {
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
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>
            <input type="text" name="fi" placeholder="FI" onChange={handleChange} />
          </td>
          <td>
            <input type="text" name="en" placeholder="EN" onChange={handleChange} />
          </td>
          <td>
            <button>Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
