import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  console.log("Logged in: ", userCredential.user);

  // Get token
  const token = await userCredential.user.getIdToken();
  console.log(token)
  return {
    uid: userCredential.user.uid,
  };

}
