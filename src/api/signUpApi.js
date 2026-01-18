import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signUp(email, password) {
  // 1) Create user in Firebase
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  // 2) Send token to backend
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
