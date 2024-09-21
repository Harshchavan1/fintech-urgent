import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB5GpibxcxeCWLNKSEoXtMivs2MgORQpCA",
    authDomain: "naac-673bb.firebaseapp.com",
    projectId: "naac-673bb",
    storageBucket: "naac-673bb.appspot.com",
    messagingSenderId: "587700451606",
    appId: "1:587700451606:web:acbef48de14c608b8db837",
    measurementId: "G-MEYJ7SH5GE"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };