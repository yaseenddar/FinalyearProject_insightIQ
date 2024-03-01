// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJebQJyIdHSnB_55-qGEoqifH2yrn6bnM",
  authDomain: "insightiq-b1407.firebaseapp.com",
  projectId: "insightiq-b1407",
  storageBucket: "insightiq-b1407.appspot.com",
  messagingSenderId: "57912632013",
  appId: "1:57912632013:web:d02f0d6c44306220483f84",
  measurementId: "G-X39R9VFNTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth,provider};