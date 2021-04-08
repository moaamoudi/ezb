import firebase from "firebase";
import "firebase/auth";
var admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyASZ4Kixswbss5lNzM3xSUbKnJZl8-9rus",
  authDomain: "ezb-dev.firebaseapp.com",
  databaseURL: "https://ezb-dev-default-rtdb.firebaseio.com",
  projectId: "ezb-dev",
  storageBucket: "ezb-dev.appspot.com",
  messagingSenderId: "353004365627",
  appId: "1:353004365627:web:40352e4910fc0804d3f91e",
  measurementId: "G-P7JDKD93NJ",
};

const app = firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const auth = app.auth();

export default app;
