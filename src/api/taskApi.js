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
export async function fetchTasks(token, limit, lastUid = null) {
  let url = `http://localhost:8080/tasks?limit=${limit}`
  if (lastUid) url += `&lastUid=${lastUid}`

  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");

  const data = await res.json();
  return data;
}


// to get the assign tasks to user
//TODO: add limit and pagination
export async function fetchUserTasks(token, limit, lastUid = null) {

  let url = `${developmentUrl}tasks/my?limit=${limit}`
  if (lastUid) url += `&lastUid=${lastUid}`
  console.log("Limit:", url)
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  })

  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return data;
}


//
export async function updateTaskStatus(token, uid, taskStatus) {

  const res = await fetch(`${developmentUrl}tasks/${uid}/status`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskStatus),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return await res.json(); // return updated task
}

// router.put("/tasks/:taskId/assign", authMiddleware, adminMiddleware, taskController.assignTask)
export async function updateTaskAssignedTo(token, taskId, taskData) {
  console.log(taskId)

  console.log("task Data: ", taskData)
  const res = await fetch(`${developmentUrl}tasks/${taskId}/assign`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskData)
  });

  if (!res.ok) {
    throw new Error("Failed to update task")
  }

  return await res.json()
}
