import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


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
export const auth = getAuth(app);