
export async function fetchUsers(token, page = 1, limit = 5) {
  try {
    const res = await fetch(`http://localhost:8080/users/users?limit=${limit}&page=${page}`, {
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