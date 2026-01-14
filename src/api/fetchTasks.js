export async function fetchTasks(token, page = 1, limit = 5) {
  try {
    const res = await fetch(`http://localhost:8080/tasks?limit=${limit}&page=${page}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchTasks error:", error.message);
    return null;
  }
}