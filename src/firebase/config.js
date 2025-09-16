import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzUDEfwYDU4FAQlWpZXTPsNTbDiDbESXA",
  authDomain: "farmconnect-app-3e079.firebaseapp.com",
  projectId: "farmconnect-app-3e079",
  storageBucket: "farmconnect-app-3e079.firebasestorage.app",
  messagingSenderId: "147069167956",
  appId: "1:147069167956:web:5502235b49042f20af40c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

export { auth, db };