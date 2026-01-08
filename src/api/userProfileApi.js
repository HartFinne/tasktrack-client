export const fetchUserProfile = async (firebaseUser) => {
  try {
    const token = await firebaseUser.getIdToken();

    const res = await fetch("http://localhost:8080/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user profile from backend");
    }

    const data = await res.json();

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role: data.role, // role from backend
    };
  } catch (err) {
    console.error("fetchUserProfile error:", err);
    return null;
  }
};
