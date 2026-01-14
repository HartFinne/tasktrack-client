
export async function fetchUsers(token, limit, lastUid = null) {
  try {
    let url = `http://localhost:8080/users/users?limit=${limit}`;
    if (lastUid) url += `&lastUid=${lastUid}`;

    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    return data; // returns { users, lastUid }
  } catch (error) {
    console.error("fetchUsers error:", error.message);
    return { users: [], lastUid: null };
  }
}