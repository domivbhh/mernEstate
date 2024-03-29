// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6a4b1.firebaseapp.com",
  projectId: "mern-estate-6a4b1",
  storageBucket: "mern-estate-6a4b1.appspot.com",
  messagingSenderId: "795372062367",
  appId: "1:795372062367:web:e81773e079bc87939144aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
