// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJHelmXBeykKF-dIyZ7CbrqO83TQLixHs",
  authDomain: "parking-mit.firebaseapp.com",
  projectId: "parking-mit",
  storageBucket: "parking-mit.firebasestorage.app",
  messagingSenderId: "604567508004",
  appId: "1:604567508004:web:bd31c69c93aeacc390f4b1",
  measurementId: "G-EVVM48Q01V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
