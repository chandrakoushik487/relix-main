import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration for Relix
const firebaseConfig = {
  apiKey: "AIzaSyDKjEjKy8y0GNVptLMYuxFvFkYaFIM7iRU",
  authDomain: "relix-6218b.firebaseapp.com",
  projectId: "relix-6218b",
  storageBucket: "relix-6218b.firebasestorage.app",
  messagingSenderId: "69931307174",
  appId: "1:69931307174:web:19c9debada5d84a2626467",
  measurementId: "G-YJBLTSSH3W"
};

// Initialize Firebase only if it hasn't been initialized already (important for Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
