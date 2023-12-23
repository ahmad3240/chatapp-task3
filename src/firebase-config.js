// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC60O-JW2STzqgI6LFI2qFtBH-u-SS2PHA",
  authDomain: "messenger-1635b.firebaseapp.com",
  projectId: "messenger-1635b",
  storageBucket: "messenger-1635b.appspot.com",
  messagingSenderId: "735306039913",
  appId: "1:735306039913:web:65fcce9c392faaee6358f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
