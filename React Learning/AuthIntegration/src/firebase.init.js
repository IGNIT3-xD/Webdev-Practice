import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSvea1edGFWPEC2IPhHX5LtNiXBVIGhbE",
    authDomain: "auth-integration-9c65e.firebaseapp.com",
    projectId: "auth-integration-9c65e",
    storageBucket: "auth-integration-9c65e.firebasestorage.app",
    messagingSenderId: "260821543219",
    appId: "1:260821543219:web:c95d0c8250ba1cb9d43646"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);