export async function createTask(token, taskData) {
  try {
    const res = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      throw new Error("Failed to create task");
    }

    return await res.json();
  } catch (error) {
    console.error("createTask error:", error.message);
    throw error; // throw to let useMutation catch it
  }
}
