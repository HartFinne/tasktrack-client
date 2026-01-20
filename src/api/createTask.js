export async function createTask(token, taskData) {
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

  return await res.json(); // return created task
}
