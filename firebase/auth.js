import { auth, db } from "./firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await data(email);
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function data(email) {
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    email: email,
  });
}

async function Reset(email) {
  await sendPasswordResetEmail(auth, email);
}

export { register, login, Reset };
