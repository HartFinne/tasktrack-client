export async function fetchTasks(token, limit, lastUid = null) {
  try {
    let url = `http://localhost:8080/tasks?limit=${limit}`
    if (lastUid) url += `&lastUid=${lastUid}`

    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");

    const data = await res.json();
    return data; // returns { users, lastUid }
  } catch (error) {
    console.error("fetchUsers error:", error.message);
    return { users: [], lastUid: null };
  }
}