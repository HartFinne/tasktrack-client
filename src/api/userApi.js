const developmentUrl = "http://localhost:8080/"
const productionUrl = null


export async function fetchUsers(token, limit = null, lastUid = null, role = null) {
  const params = new URLSearchParams({
    limit,
    lastUid: lastUid || "",
    role: role || "all"
  })

  const res = await fetch(`${developmentUrl}users/users?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return await res.json();
}

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


export async function fetchCountUsers(token) {
  const res = await fetch(`${developmentUrl}users/count`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json()
}
