import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyCMPbYPG9R5Xs5nAYWNdr-AHvbtoBOi9Ck",
    authDomain: "sa-diwa-project.firebaseapp.com",
    databaseURL: "https://sa-diwa-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sa-diwa-project",
    storageBucket: "sa-diwa-project.firebasestorage.app",
    messagingSenderId: "254649554760",
    appId: "1:254649554760:web:4d2b92b6169fb2adf3057d",
    measurementId: "G-6Z66RBV1CD",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app); 

export { app, analytics, auth, database, storage };