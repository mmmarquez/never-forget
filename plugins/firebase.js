// Initialize Firebase
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyC0n44Sfq-bjAyVV-q1MbqzRqP50WQNAJc",
  authDomain: "backend-65b11.firebaseapp.com",
  databaseURL: "https://backend-65b11.firebaseio.com",
  projectId: "backend-65b11",
  storageBucket: "backend-65b11.appspot.com",
  messagingSenderId: "773970614768"
};
const fire = firebase.initializeApp(config);
export default fire;
