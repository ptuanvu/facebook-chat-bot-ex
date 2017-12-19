import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCOCcbzxlUQEkyZJNHPE4nGtJnfYAOzUbQ",
    authDomain: "footballdata-76240.firebaseapp.com",
    databaseURL: "https://footballdata-76240.firebaseio.com",
    projectId: "footballdata-76240",
    storageBucket: "",
    messagingSenderId: "903602941103"
  };

const Firebase = {};

firebase.initializeApp(config);
Firebase.database = firebase.database();

export default Firebase;
