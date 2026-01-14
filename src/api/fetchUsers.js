
export async function fetchUsers(token) {
  try {
    const res = await fetch("http://localhost:8080/users/users", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchUsers error:", error.message);
    return null;
  }
}