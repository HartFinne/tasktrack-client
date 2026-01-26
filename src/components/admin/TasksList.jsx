import Pagination from "../Pagination.jsx"
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchTasks } from "../../api/taskApi";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import UpdateAssignModal from "./UpdateAssignModal";
import { useState } from "react";

const TasksList = ({ limit }) => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null)

  const { lastUid, page, hasPrev, nextPage, prevPage } = useCursorPagination();

  const { data: tasksData = { tasks: [], lastUid: null }, isPending, isError, error } = useQuery({
    queryKey: ["tasks", lastUid],
    queryFn: () => fetchTasks(user.token, limit, lastUid),
    staleTime: 60 * 1000,
    enabled: !!user?.token,
  });

  const getStatusBadge = (status) => {
    if (status === "backlog") return "badge badge-info";
    if (status === "in_progress") return "badge badge-warning";
    if (status === "done") return "badge badge-success";
    return "badge badge-outline";
  };

  return (
    <div className="mt-2 space-y-4 w-full text-base-content">
      <UpdateAssignModal task={selectedTask} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
          Tasks
        </div>

        <Pagination
          onNext={() => nextPage(tasksData.lastUid)}
          onPrev={prevPage}
          hasNext={!!tasksData.lastUid}
          hasPrev={hasPrev}
          page={page}
        />
      </div>

      {/* Skeleton loader */}
      {/* Skeleton loader */}
      {isPending &&
        Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="p-3 rounded-lg border border-base-300 animate-pulse bg-base-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="h-4 w-2/3 sm:w-1/3 bg-base-300 rounded"></div>
              <div className="h-4 w-24 sm:w-20 bg-base-300 rounded"></div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-3 w-full bg-base-300 rounded"></div>
              <div className="h-3 w-5/6 bg-base-300 rounded"></div>
              <div className="h-3 w-2/3 bg-base-300 rounded"></div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
              <div className="h-6 w-28 bg-base-300 rounded"></div>
              <div className="h-8 w-20 bg-base-300 rounded"></div>
            </div>
          </div>
        ))}


      {/* Error */}
      {isError && (
        <div className="text-center text-error">Error loading tasks: {error.message}</div>
      )}

      {/* No tasks */}
      {!isPending && !isError && tasksData.tasks.length === 0 && (
        <div className="text-center text-base-content/70">No tasks found.</div>
      )}

      {/* Task list */}
      {!isPending &&
        !isError &&
        tasksData.tasks.map((task) => (
          <div
            key={task.uid}
            className="p-3 rounded-lg border border-base-300 hover:bg-base-300 transition-colors bg-base-100 flex flex-col md:flex-col gap-2"
          >
            {/* Top row: Title + Status */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 flex-wrap">
              <p className="font-medium text-base-content break-words">{task.title}</p>
              <span className={`${getStatusBadge(task.status)} font-semibold`}>
                {task.status.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-base-content/70 mb-2 line-clamp-3 break-words">
              {task.description}
            </p>

            {/* Bottom row: Assigned Email + Edit button */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 flex-wrap">
              <span className="badge badge-soft badge-secondary">
                {task.assignedEmail || "Unassigned"}
              </span>
              <button
                className="btn btn-primary btn-sm w-full md:w-auto"
                onClick={() => {
                  setSelectedTask(task);
                  document.getElementById("updateAssignModal").showModal();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TasksList;