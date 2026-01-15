import { auth } from "../config/firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth"
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages.js";

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log("Logged in: ", userCredential.user)

    const token = await userCredential.user.getIdToken()
    console.log("Token: ", token)

    return { success: true, uid: userCredential.user.uid };
  } catch (err) {
    const friendlyMessage = firebaseErrorMessages[err.code] || firebaseErrorMessages["default"];
    return { success: false, error: friendlyMessage };
  }
}
