import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "lpf-checkout-system.firebaseapp.com",
  projectId: "lpf-checkout-system",
  storageBucket: "lpf-checkout-system.firebasestorage.app",
  messagingSenderId: "868507895232",
  appId: "1:868507895232:web:fdd98f1ab01162a2767425"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };