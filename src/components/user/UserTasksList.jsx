import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchUserTasks } from "../../api/taskApi";
import formatCreatedAt from "../../utils/formatCreatedAt"
import UpdateTaskModal from "./UpdateTaskModal";
import Pagination from "../Pagination";
import TaskSkeleton from "../../components/user/TaskSkeleton"
import { useState } from "react";

const limit = 50

const UserTasksList = () => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null)

  const { lastUid, page, hasPrev, nextPage, prevPage } = useCursorPagination();

  console.log(user.token)

  const { data: tasksData = { tasks: [], lastUid: null }, isPending, isError, error } = useQuery({
    queryKey: ["userTasks", lastUid],
    queryFn: () => fetchUserTasks(user.token, limit, lastUid),
    staleTime: 60 * 1000,
    enabled: !!user?.token,
  });

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex items-center justify-end mb-6">
        <Pagination
          onNext={() => nextPage(tasksData.lastUid)}
          onPrev={prevPage}
          hasNext={!!tasksData.lastUid}
          hasPrev={hasPrev}
          page={page}
        />

      </div>
      <UpdateTaskModal task={selectedTask} />

      {isPending && <TaskSkeleton />}

      {/* Empty state (after loading) */}
      {!isPending && tasksData.tasks.length === 0 && (
        <div className="flex items-center justify-center mt-20">
          <span>No tasks to load.</span>
        </div>
      )}

      {!isPending && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasksData.tasks.map(task => (
            <div
              key={task.uid}
              className="card bg-base-200 shadow-lg border border-base-300"
            >
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
                      setSelectedTask(task)
                      document
                        .getElementById("updateStatusModal")
                        .showModal()
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UserTasksList