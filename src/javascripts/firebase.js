import firebase from "firebase";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyAtGlhbYJGtnNmdYSTrkIGA30l14dDbMjg",
  authDomain: "kielipeli-54441.firebaseapp.com",
  databaseURL: "https://kielipeli-54441.firebaseio.com",
  projectId: "kielipeli-54441",
  storageBucket: "kielipeli-54441.appspot.com",
  messagingSenderId: "403040416712"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
