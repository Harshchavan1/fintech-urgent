// Import the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB5GpibxcxeCWLNKSEoXtMivs2MgORQpCA",
  authDomain: "naac-673bb.firebaseapp.com",
  projectId: "naac-673bb",
  storageBucket: "naac-673bb.appspot.com",
  messagingSenderId: "587700451606",
  appId: "1:587700451606:web:acbef48de14c608b8db837",
  measurementId: "G-MEYJ7SH5GE"
};

// Initialize Firebase app with config
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { db };
