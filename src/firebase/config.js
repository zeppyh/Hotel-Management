import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmCoGhhS4GFRd19Gu7PYB6OoYgQzj_WNU",
  authDomain: "hotel-management-fb4a5.firebaseapp.com",
  projectId: "hotel-management-fb4a5",
  storageBucket: "hotel-management-fb4a5.firebasestorage.app",
  messagingSenderId: "631196860476",
  appId: "1:631196860476:web:8a59049b1099b69bbfc339",
  measurementId: "G-6Z66RBV1CD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
