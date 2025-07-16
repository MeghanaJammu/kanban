// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Eg2b4DxV2fd-dZkzosqwMe0fdnRknH4",
  authDomain: "kanbanauth.firebaseapp.com",
  projectId: "kanbanauth",
  storageBucket: "kanbanauth.firebasestorage.app",
  messagingSenderId: "893200384757",
  appId: "1:893200384757:web:6cc6dd909f772906f03bbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
