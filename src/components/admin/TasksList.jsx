import Pagination from "../../components/admin/Pagination";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchTasks } from "../../api/fetchTasks";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const TasksList = ({ limit }) => {
  const { user } = useAuth();

  const { lastUid, page, hasPrev, nextPage, prevPage } = useCursorPagination();

  const { data: tasksData = { tasks: [], lastUid: null }, isPending, isError, error } = useQuery({
    queryKey: ["tasks", lastUid],
    queryFn: () => fetchTasks(user.token, limit, lastUid),
    staleTime: Infinity,
    enabled: !!user?.token,
  });

  return (
    <div className="mt-6">
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
            </tr>
          </thead>
          <tbody>
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

            {!isPending && !isError && tasksData.tasks.map((taskItem, index) => (
              <tr key={taskItem.uid} className="text-center hover:bg-base-300">
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{taskItem.title}</td>
                <td>{taskItem.description}</td>
                <td>{taskItem.status}</td>
                <td>{taskItem.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
