import Pagination from "../../components/admin/Pagination";
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

  return (
    <div className="mt-6">

      <UpdateAssignModal task={selectedTask} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>

        <Pagination
          onNext={() => nextPage(tasksData.lastUid)}
          onPrev={prevPage}
          hasNext={!!tasksData.lastUid}
          hasPrev={hasPrev}
          page={page}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isPending && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="text-center">
                <td><div className="skeleton h-4 w-6 mx-auto"></div></td>
                <td><div className="skeleton h-4 w-40 mx-auto"></div></td>
                <td><div className="skeleton h-4 w-24 mx-auto"></div></td>
                <td><div className="skeleton h-4 w-40 mx-auto"></div></td>
                <td><div className="skeleton h-4 w-24 mx-auto"></div></td>
              </tr>
            ))}

            {isError && (
              <tr>
                <td colSpan={5} className="text-center text-red-600">
                  Error loading tasks: {error.message}
                </td>
              </tr>
            )}

            {!isPending && !isError && tasksData.tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}

            {!isPending && !isError && tasksData.tasks.map((task, index) => (
              <tr key={task.uid} className="text-center hover:bg-base-300">
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <span className={`badge ${task.status === "backlog" ? "badge-secondary" :
                    task.status === "in_progress" ? "badge-warning" :
                      "badge-success"} font-semibold`}>
                    {task.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {task.assignedEmail}
                </td>
                <td>
                  <button className="btn btn-primary btn-xs" onClick={() => {
                    setSelectedTask(task)
                    document.getElementById("updateAssignModal").showModal()
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                    </svg>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
