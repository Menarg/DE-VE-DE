// Database info in module for security.

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7IjraubIDKAZx2iIZOiYsD6MkCA3o_Ts",
  authDomain: "de-ve-de-2399b.firebaseapp.com",
  projectId: "de-ve-de-2399b",
  storageBucket: "de-ve-de-2399b.appspot.com",
  messagingSenderId: "229967589057",
  appId: "1:229967589057:web:209fe2ced980c53e6e6e40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{db};