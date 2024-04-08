// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-92603.firebaseapp.com",
  projectId: "mern-auth-92603",
  storageBucket: "mern-auth-92603.appspot.com",
  messagingSenderId: "622990744220",
  appId: "1:622990744220:web:d2cf3c152e686b3ea4ab59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);