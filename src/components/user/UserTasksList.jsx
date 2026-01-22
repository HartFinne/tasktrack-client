import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetchUserTasks } from "../../api/taskApi";
import formatCreatedAt from "../../utils/formatCreatedAt"
import UpdateTaskModal from "./UpdateTaskModal";
import { useState } from "react";

const UserTasksList = () => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null)

  const { data, isError, error } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchUserTasks(user.token),
    enabled: !!user?.token,
  })

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <UpdateTaskModal task={selectedTask} />


      {data.tasks.length === 0 && (
        <div className="alert alert-info">
          <span>No tasks assigned to you.</span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.tasks.map((task) => (
          <div key={task.uid} className="card bg-base-200 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title justify-between items-center">
                {task.title}
                <span
                  className={`badge ${task.status === "backlog"
                    ? "badge-secondary"
                    : task.status === "in_progress"
                      ? "badge-warning"
                      : "badge-success"
                    }`}
                >
                  {task.status.replace("_", " ").toUpperCase()}
                </span>
              </h2>

              <p className="text-sm text-gray-600">
                {task.description}
              </p>

              <div className="card-actions justify-between items-center mt-5">
                <span className="text-xs opacity-60">
                  Created at: {formatCreatedAt(task.createdAt)}
                </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setSelectedTask(task);
                    document
                      .getElementById("updateStatusModal")
                      .showModal();
                  }}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserTasksList