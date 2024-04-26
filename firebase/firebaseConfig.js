// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvmPwFq0DhxPqFG7agw5UzZ70MGBfEw7g",
  authDomain: "task4-e9a68.firebaseapp.com",
  projectId: "task4-e9a68",
  storageBucket: "task4-e9a68.appspot.com",
  messagingSenderId: "446726477642",
  appId: "1:446726477642:web:c9c0923e4c0efff73213b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };
