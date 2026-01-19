import Pagination from "../../components/admin/Pagination";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchTasks } from "../../api/fetchTasks";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const TasksList = ({ limit }) => {
  const { user } = useAuth();

  // Task pagination
  const {
    lastUid: lastTaskUid,
    page: taskPage,
    hasPrev: taskHasPrev,
    nextPage: taskNextPage,
    prevPage: taskPrevPage,
  } = useCursorPagination(limit);

  // fetch the tasks data using react query
  const { data: tasksData = { tasks: [], lastUid: null }, isPending, isError, error } = useQuery({
    queryKey: ["tasks", lastTaskUid],
    queryFn: () => fetchTasks(user.token, limit, lastTaskUid),
    enabled: !!user?.token,
  });

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>


        <Pagination
          onNext={() => taskNextPage(tasksData.lastUid)}
          onPrev={taskPrevPage}
          hasNext={!!tasksData.lastUid}
          hasPrev={taskHasPrev}
          page={taskPage}
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
            </tr>
          </thead>

          <tbody>
            {/* Loading Skeleton */}
            {isPending &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="text-center">
                  <td>
                    <div className="skeleton h-4 w-6 mx-auto"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-40 mx-auto"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-24 mx-auto"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-40 mx-auto"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-24 mx-auto"></div>
                  </td>
                </tr>
              ))}


            {/* Error */}
            {isError && (
              <tr>
                <td colSpan={3} className="text-center text-red-600">
                  Error loading tasks: {error.message}
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!isPending && !isError && tasksData.tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}

            {/* Actual data */}
            {!isPending &&
              !isError &&
              tasksData.tasks.map((task, index) => (
                <tr key={task.uid} className="text-center hover:bg-base-300">
                  <td>{(taskPage - 1) * limit + index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedTo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default TasksList