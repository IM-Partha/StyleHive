// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXTTM5EgIDK1B1ZyerRMWmm6VFnqUFCNs",
  authDomain: "aliexpress-c8d0f.firebaseapp.com",
  projectId: "aliexpress-c8d0f",
  storageBucket: "aliexpress-c8d0f.appspot.com", // ✅ fixed typo here
  messagingSenderId: "588762323871",
  appId: "1:588762323871:web:a86d7558d3a3b89076fbaa",
  measurementId: "G-DQQBEG9LTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
