// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOzluA6gOejDvxfSr-soP_yRfY0sGaXF4",
    authDomain: "fir-tutorial-7aa35.firebaseapp.com",
    projectId: "fir-tutorial-7aa35",
    storageBucket: "fir-tutorial-7aa35.firebasestorage.app",
    messagingSenderId: "983012435547",
    appId: "1:983012435547:web:35eba2d8dae27daf00817e"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)