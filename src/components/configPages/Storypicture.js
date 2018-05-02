import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import firestore from "../../javascripts/firebase";

const colRef = "assignments/storypicture/pairs";

class StorypictureConfig extends Component {
  constructor() {
    super();

    this.state = {
      pairs: [],
      pair: {
        story: "",
        pictureUrl: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPair = this.addPair.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }
  componentDidMount() {
    firestore.collection(colRef).onSnapshot(snapshot => {
      const _pairs = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ pairs: _pairs });
    });
  }

  deletePair(id) {
    firestore
      .collection(colRef)
      .doc(id)
      .delete();
  }

  handleChange(e) {
    let _pair = { ...this.state.pair, story: e.target.value };
    this.setState({ pair: _pair });
  }

  handleUploadSuccess = filename => {
    console.log("handleuploadsuccess " + filename);
    this.setState({ avatar: filename });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        const _pair = { ...this.state.pair, pictureUrl: url };
        this.setState({ pair: _pair });
      });
  };

  async addPair() {
    if(!this.state.pair.pictureUrl) {
      alert('You need to upload an image first!')
      return;
    }
    try {
      await firestore.collection(colRef).add(this.state.pair);
    } catch (err) {}
  }

  render() {
    return (
      <div className="container">
        <h1>StorypictureConfig</h1>
        <div className="row">
          <div className="col-sm-6">
            <PairTable
              pairs={this.state.pairs}
              handleUploadSuccess={this.handleUploadSuccess}
              addPair={this.addPair}
              handleChange={this.handleChange}
              deletePair={this.deletePair}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StorypictureConfig;

const PairTable = ({
  pairs,
  addPair,
  deletePair,
  handleChange,
  newPair,
  handleUploadSuccess
}) => {
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
        <tr>
          <td>
            <input
              type="text"
              name="fi"
              placeholder="Story"
              onChange={handleChange}
              // value={newPair.fi}
            />
          </td>
          <td>
            <FileUploader
              accept="image/*"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadSuccess={handleUploadSuccess}
            />
          </td>
          <td>
            <button className="btn btn-primary" onClick={addPair}>
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
