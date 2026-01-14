
export async function fetchTasks(token) {
  try {
    const res = await fetch("http://localhost:8080/tasks", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchUsers error:", error.message);
    return null;
  }
}