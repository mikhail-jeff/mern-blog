// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-3fb4f.firebaseapp.com",
	projectId: "mern-blog-3fb4f",
	storageBucket: "mern-blog-3fb4f.appspot.com",
	messagingSenderId: "711952917631",
	appId: "1:711952917631:web:cbb72b306b52923441cb4a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
