import Pagination from "../Pagination.jsx";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchTasks } from "../../api/taskApi";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import UpdateAssignModal from "./UpdateAssignModal";
import Filter from "./Filter";
import { useState } from "react";

const TasksList = ({ limit }) => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const TASK_STATUSES = ["all", "backlog", "in_progress", "done"];


  const { lastUid, page, hasPrev, nextPage, prevPage, resetPagination } = useCursorPagination();

  const {
    data: tasksData = { tasks: [], lastUid: null, hasNext: false }, isPending, isError, error, } = useQuery({
      queryKey: ["tasks", lastUid, statusFilter],
      queryFn: () => fetchTasks(user.token, limit, lastUid, statusFilter),
      staleTime: 60 * 1000,
      enabled: !!user?.token,
    });

  const getStatusBadge = (status) => {
    if (status === "backlog") return "badge badge-ghost";
    if (status === "in_progress") return "badge badge-warning";
    if (status === "done") return "badge badge-success";
    return "badge badge-outline";
  };

  return (
    <div className="mt-2 space-y-4 w-full text-base-content">
      <UpdateAssignModal task={selectedTask} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        {/* Title */}
        <div className="flex items-center gap-2 text-xl font-bold">
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

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2 grow">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              placeholder="Search"
              className="input-grow bg-base-100"
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>

          {/* Status Filter */}
          <Filter
            options={TASK_STATUSES}
            value={statusFilter}
            onChange={(newStatus) => {
              setStatusFilter(newStatus);
              resetPagination();
            }}
          />


        </div>
      </div>

      {/* Skeleton Loader */}
      {isPending && (
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl shadow-sm">
          <table className="table">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: limit }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td>
                    <div className="h-4 w-40 bg-base-300 rounded mb-2"></div>
                    <div className="h-3 w-64 bg-base-300 rounded"></div>
                  </td>
                  <td><div className="h-6 w-32 bg-base-300 rounded"></div></td>
                  <td><div className="h-6 w-20 bg-base-300 rounded"></div></td>
                  <td className="text-right">
                    <div className="h-8 w-16 bg-base-300 rounded ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-error">
          Error loading tasks: {error.message}
        </div>
      )}

      {/* Empty State */}
      {!isPending && !isError && tasksData.tasks.length === 0 && (
        <div className="text-center text-base-content/70 py-10">
          No tasks found.
        </div>
      )}

      {/* Task Table */}
      {!isPending && !isError && tasksData.tasks.length > 0 && (
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl shadow-sm">
          <table className="table">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th className="w-[50%]">Task</th>
                <th >Assigned To</th>
                <th>Status</th>
                <th className="text-right w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasksData.tasks.map((task) => (
                <tr key={task.uid} className="hover">
                  {/* Task Info */}
                  <td>
                    <div className="font-semibold mb-2">{task.title}</div>
                    <div className="text-sm text-base-content/70 line-clamp-2">
                      {task.description}
                    </div>
                  </td>

                  {/* Assigned */}
                  <td>
                    {task.assignedEmail ? (
                      <span>
                        {task.assignedEmail}
                      </span>
                    ) : (
                      <span className="text-base-content/50 italic">
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`${getStatusBadge(task.status)} font-semibold whitespace-nowrap`}
                    >
                      {task.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </td>


                  {/* Actions */}
                  <td className="text-right">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSelectedTask(task);
                        document
                          .getElementById("updateAssignModal")
                          .showModal();
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      )}
      <div className="flex justify-end">
        <Pagination
          page={page}
          onNext={() => nextPage(tasksData.lastUid)}
          onPrev={prevPage}
          hasNext={tasksData.hasNext}
          hasPrev={hasPrev}
        />
      </div>

    </div>
  );
};

export default TasksList;
