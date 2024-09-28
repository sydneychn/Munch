// ./src/service/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
