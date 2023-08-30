// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChUPoofJWHXBpzwQtqCzUyi7HlxyfgjjE",
  authDomain: "syncscribe-35513.firebaseapp.com",
  projectId: "syncscribe-35513",
  storageBucket: "syncscribe-35513.appspot.com",
  messagingSenderId: "414430493636",
  appId: "1:414430493636:web:353b80a4c87c1abbd64291",
  measurementId: "G-WX9DDSMY2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);