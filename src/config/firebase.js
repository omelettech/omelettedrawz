// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCLeY5ptlk64HnyAJGrtlnbzN4URFrnSc",
  authDomain: "omelettedrawz.firebaseapp.com",
  projectId: "omelettedrawz",
  storageBucket: "omelettedrawz.appspot.com",
  messagingSenderId: "561831295110",
  appId: "1:561831295110:web:cf23304b4afb5e948bb907",
  measurementId: "G-54BFDLXTXF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (if needed, make sure this function exists in your SDK version)
const analytics = getAnalytics(app);

export { app, auth, db, analytics };