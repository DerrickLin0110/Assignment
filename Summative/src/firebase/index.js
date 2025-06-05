import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr4tFqAsORLL-41Hl8W_2ukNRMvdsXgqA",
  authDomain: "ics4u-580be.firebaseapp.com",
  projectId: "ics4u-580be",
  storageBucket: "ics4u-580be.appspot.com",
  messagingSenderId: "546357072337",
  appId: "1:546357072337:web:39c6f9fc2ec7a0c37050f0",
  measurementId: "G-1CXX68E52E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get services from the initialized app
const auth = getAuth(app);
const firestore = getFirestore(app);  // Fixed function name and variable

export { auth, firestore };  // Fixed variable name