// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr4tFqAsORLL-41Hl8W_2ukNRMvdsXgqA",
  authDomain: "ics4u-580be.firebaseapp.com",
  projectId: "ics4u-580be",
  storageBucket: "ics4u-580be.firebasestorage.app",
  messagingSenderId: "546357072337",
  appId: "1:546357072337:web:39c6f9fc2ec7a0c37050f0",
  measurementId: "G-1CXX68E52E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseConfig);
const firesotre = getfirestore(firebaseConfig);

export {auth, firesotre}
