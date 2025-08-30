// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cast-5fb4e.firebaseapp.com",
  projectId: "cast-5fb4e",
  storageBucket: "cast-5fb4e.firebasestorage.app",
  messagingSenderId: "79539751025",
  appId: "1:79539751025:web:9635bf96373cd3d858b3d0",
  measurementId: "G-F1E1RC3MLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);