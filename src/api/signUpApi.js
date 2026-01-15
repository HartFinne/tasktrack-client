
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages.js";

export async function signUp(email, password) {
  try {
    // 1️ Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Firebase Auth user created:", userCredential.user.uid);

    // 2️ Get ID token
    const token = await userCredential.user.getIdToken();
    console.log("ID Token generated:", token);

    // 3️ Call backend /users/register
    const res = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // backend doesn't need email/password
    });

    const data = await res.json();
    console.log("Backend response:", data);
    return { success: true, uid: userCredential.user.uid };
  } catch (error) {
    console.log("error message: ", error.message)
    if (error.message.includes("auth/password-does-not-meet-requirements")) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: firebaseErrorMessages[error.code] }
    }
  }
}
