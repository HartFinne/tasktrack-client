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
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    lastUid,
    page,
    hasPrev,
    nextPage,
    prevPage,
    resetPagination
  } = useCursorPagination();

  console.log(user.token)

  const { data: tasksData = { tasks: [], lastUid: null, hasNext: false }, isPending, isError, error } = useQuery({
    queryKey: ["userTasks", lastUid, statusFilter],
    queryFn: () => fetchUserTasks(user.token, limit, lastUid, statusFilter),
    staleTime: 60 * 1000,
    enabled: !!user?.token,
  });

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "backlog", "in_progress", "done"].map(status => (
          <button
            key={status}
            className={`btn btn-sm ${statusFilter === status ? "btn-primary" : "btn-soft"}`}
            onClick={() => {
              setStatusFilter(status);
              resetPagination(); // 💥 resets to page 1 for new filter
            }}
          >
            {status === "all"
              ? "All"
              : status
                .replace(/_/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase())
            }
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end mb-6">
        <Pagination
          onNext={() => nextPage(tasksData.lastUid)}
          onPrev={prevPage}
          hasNext={tasksData.hasNext}
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
              className="card bg-base-100 shadow-md border border-base-300 hover:shadow-xl transition h-66 flex flex-col"
            >
              <div className="card-body space-y-3 flex flex-col">

                <h2 className="card-title justify-between items-start gap-2">
                  <span className="line-clamp-2">{task.title}</span>
                  <span
                    className={`badge ${task.status === "backlog"
                      ? "badge-ghost"
                      : task.status === "in_progress"
                        ? "badge-warning"
                        : "badge-success"
                      }`}
                  >
                    {task.status.replace("_", " ").toUpperCase()}
                  </span>
                </h2>

                <div className="relative overflow-hidden">
                  <p className="text-sm text-base-content/70 line-clamp-5 leading-relaxed">
                    {task.description}
                  </p>
                  <div className="absolute bottom-0 right-0 w-20 h-6 bg-linear-to-l from-base-100 via-base-100 to-transparent pointer-events-none" />
                </div>

                <div className="card-actions justify-between items-center mt-auto">
                  <span className="text-xs opacity-60">
                    Created at: {formatCreatedAt(task.createdAt)}
                  </span>

                  <button
                    className="btn btn-sm btn-primary transition hover:scale-105 active:scale-95"
                    onClick={() => {
                      setSelectedTask(task);
                      document.getElementById("updateStatusModal").showModal();
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