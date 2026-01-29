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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// to get all the tasks in admin
export async function fetchTasks(token, limit = null, lastUid = null, status = null) {
  const params = new URLSearchParams({
    limit,
    lastUid: lastUid || "",
    status: status || "all",
  });

  const res = await fetch(`${developmentUrl}tasks?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");

  const data = await res.json();
  return data;
}


// to get the assign tasks to user
//TODO: add limit and pagination
// api/taskApi.js
export const fetchUserTasks = async (token, limit, lastUid, status) => {
  const params = new URLSearchParams({
    limit,
    lastUid: lastUid || "",
    status: status || "all",
  });

  const res = await fetch(`${developmentUrl}tasks/my?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

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
  console.log("update task")
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

  return await res.json()
}

export async function fetchCountTasks(token) {
  const res = await fetch(`${developmentUrl}tasks/count`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}
