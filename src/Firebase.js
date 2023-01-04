/*The stuff they told me to add lol*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj7XLwCQAkn2zwkbiQBCkyUo9efWiRdI8",
  authDomain: "tidey-db.firebaseapp.com",
  projectId: "tidey-db",
  storageBucket: "tidey-db.appspot.com",
  messagingSenderId: "659811657321",
  appId: "1:659811657321:web:074999adc73bf8aed824f8",
  measurementId: "G-TKGLT3H8WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
