const developmentUrl = "http://localhost:8080/"
const productionUrl = null

// to create a new task
export async function createTask(token, taskData) {
  const res = await fetch(`${developmentUrl}task`, {
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

// to get all the tasks in admin


// to get the assign tasks to user
export async function fetchUserTasks(token) {
  const res = await fetch(`${developmentUrl}tasks/my`, {
    headers: { "Authorization": `Bearer ${token}` }
  })

  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return data;
}
