// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Firebase configuration
import { firebaseConfig } from "./firebase.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase and SDKs
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
