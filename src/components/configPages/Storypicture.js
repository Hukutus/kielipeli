import React, { Component } from "react";
import firestore from "../../javascripts/firebase";

const colRef = "assignments/storypicture/pairs";

class StorypictureConfig extends Component {
  constructor() {
    super();

    this.state = {
      pairs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPair = this.addPair.bind(this);
  }
  componentDidMount() {
    firestore.collection(colRef).onSnapshot(snapshot => {
      const _pairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ pairs: _pairs });
    });
  }

  addPair() {

  }

  deletePair(id) {
    firestore
      .collection(colRef)
      .doc(id)
      .delete();
  }

  handleChange(e) {
    let _newPair = { ...this.state.newPair };
    _newPair[e.target.name] = e.target.value;
    this.setState({ newPair: _newPair });
  }

  render() {
    return (
      <div className="container">
        <h1>StorypictureConfig</h1>
        <div className="row">
          <div className="col-sm-6">
            <PairTable pairs={this.state.pairs} />
          </div>
        </div>
      </div>
    );
  }
}

export default StorypictureConfig;

const PairTable = ({ pairs, addPair, deletePair, handleChange, newPair }) => {
  return (
    <table className="table table-stribed">
      <thead>
        <tr>
          <th>Story</th>
          <th>Picture</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {pairs.map(pair => {
          return (
            <tr key={pair.id}>
              <td>{pair.story}</td>
              <td>
                <a href={pair.pictureUrl}>
                  <img src={pair.pictureUrl} alt="" width="100" />
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePair(pair.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        {/*  <tr>
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
            <button className="btn btn-primary" onClick={addPair}>
              Add
            </button>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};
