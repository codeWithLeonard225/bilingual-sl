// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCkzIGKA9W9MVs_wgj9QsfzwSYlatxEBtA",
  authDomain: "baligualsms.firebaseapp.com",
  projectId: "baligualsms",
  storageBucket: "baligualsms.firebasestorage.app",
  messagingSenderId: "452072283061",
  appId: "1:452072283061:web:545b09aff3fb83a92bd7fc",
  measurementId: "G-L1XQT67VEE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
