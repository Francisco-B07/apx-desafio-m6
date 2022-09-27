import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "JoOJZ6R1PwowBuGjM9H4sGlQQEux9N8BzzAzVn8L",
  databaseURL: "https://desafio-m6-apx-default-rtdb.firebaseio.com",
  authDomain: "desafio-m6-apx.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb };
