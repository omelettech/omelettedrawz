// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaVQzVHbadSe1Ic8gVzi1iw1qVuB-g5RI",
  authDomain: "omelettedrawz-yourmom.firebaseapp.com",
  projectId: "omelettedrawz-yourmom",
  storageBucket: "omelettedrawz-yourmom.appspot.com",
  messagingSenderId: "33771724295",
  appId: "1:33771724295:web:e519ba8b1366dd876f94a2",
  measurementId: "G-YVELVSRRMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);