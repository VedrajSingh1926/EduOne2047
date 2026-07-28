import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCegG8Z6TjTccaIoLriN3Zzkd8vUJVyDxU",
  authDomain: "eduone-2047.firebaseapp.com",
  projectId: "eduone-2047",
  storageBucket: "eduone-2047.firebasestorage.app",
  messagingSenderId: "474140733733",
  appId: "1:474140733733:web:56528e018b51aa03f96acc",
  measurementId: "G-0BXWWQKV39",
  databaseURL: "https://eduone-2047-default-rtdb.firebaseio.com" // Standard URL format for Firebase Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { app, db };
