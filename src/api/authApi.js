import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

// SignUp
export async function signUp(email, password) {
  // Create user in Firebase
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  // Send token to backend
  const res = await fetch("http://localhost:8080/users/register", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();
  console.log("Backend response:", data);

  return {
    success: true,
    uid: userCredential.user.uid,
  };
}


// Login
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