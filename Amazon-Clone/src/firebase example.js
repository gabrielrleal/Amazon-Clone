import firebase from "firebase";

//replace with your info and rename this file to firebase.js

const firebaseConfig = {
  apiKey: /*"replace with your apiKey "*/,
  authDomain: /*"replace with your authDomain "*/,
  databaseURL: /*"replace with your databaseURL "*/,
  projectId: /*"replace with your projectId "*/,
  storageBucket: /*"replace with your storageBucket "*/,
  messagingSenderId: /*"replace with your messagingSenderId "*/,
  appId: /*"replace with your appId "*/,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
