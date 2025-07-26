import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHE_kS4s9v6uR3O2MA8GBlStzyWPVszag",
  authDomain: "bibbyflores-github.firebaseapp.com",
  projectId: "bibbyflores-github",
  storageBucket: "bibbyflores-github.firebasestorage.app",
  messagingSenderId: "223719645706",
  appId: "1:223719645706:web:91072b6b891e934ae5b5f3",
  measurementId: "G-WQTGNTW2HW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword };
