// firebase.js

// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"; // <-- Import Auth functions
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmSw8LdYGT_feQ_3pRlR6HZrn3qE8ipJo",
  authDomain: "volunteer-hacks.firebaseapp.com",
  projectId: "volunteer-hacks",
  storageBucket: "volunteer-hacks.firebasestorage.app",
  messagingSenderId: "522927214135",
  appId: "1:522927214135:web:a116129a633955ba3ab9b2",
  measurementId: "G-3WR52S8569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);  // <-- Get auth instance

// Export Auth functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
