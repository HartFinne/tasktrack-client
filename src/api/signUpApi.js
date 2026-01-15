import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages.js";

export async function signUp(email, password) {
  try {
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

  } catch (error) {
    console.log("Raw error:", error.message);

    // Handle Firebase password requirement errors
    if (error.message.includes("auth/password-does-not-meet-requirements")) {

      // Extract requirement list between [ ... ]
      const matches = error.message.match(/\[(.*)\]/);

      let formattedMessage = "Your password must meet the following requirements:\n";

      if (matches && matches[1]) {
        const requirements = matches[1]
          .split(",")
          .map(r => "- " + r.trim()) // bullet list
          .join("\n");

        formattedMessage += requirements;
      } else {
        formattedMessage += "- Unknown password requirement error";
      }

      return { success: false, error: formattedMessage };
    }

    // Default Firebase error mapping
    return {
      success: false,
      error: firebaseErrorMessages[error.code] || "An unexpected error occurred",
    };
  }
}
