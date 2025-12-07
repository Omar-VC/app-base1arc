import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0yFlhlnU15UmEnZQenIbHf6B8aHo8Ry8",
  authDomain: "app-base1arc.firebaseapp.com",
  projectId: "app-base1arc",
  storageBucket: "app-base1arc.firebasestorage.app",
  messagingSenderId: "898024619892",
  appId: "1:898024619892:web:a940d026b3b34d288eb621"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
