// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9-N_FhSilNDgGGyFC0Wnxs9lsXDDi6Fk",
  authDomain: "retry-2a8b1.firebaseapp.com",
  projectId: "retry-2a8b1",
  storageBucket: "retry-2a8b1.firebasestorage.app",
  messagingSenderId: "150841805493",
  appId: "1:150841805493:web:9faba643d9e89b7f784cfc",
  measurementId: "G-N9F5ML4TH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
