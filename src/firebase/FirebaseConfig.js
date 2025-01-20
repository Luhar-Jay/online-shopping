// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4n3VXCV3v3bGSNu96ytOAd9e84IC5tsc",
  authDomain: "online-shopping-7628b.firebaseapp.com",
  projectId: "online-shopping-7628b",
  storageBucket: "online-shopping-7628b.firebasestorage.app",
  messagingSenderId: "1068582264458",
  appId: "1:1068582264458:web:67e8a443def50b247e5773",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
