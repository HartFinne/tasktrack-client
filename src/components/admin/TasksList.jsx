
const TasksList = ({ tasks, isLoading, isError, error, page, limit }) => {
  console.log(tasks)
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Tasks</h2>

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
            {isLoading &&
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
            {!isLoading && !isError && tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}

            {/* Actual data */}
            {!isLoading &&
              !isError &&
              tasks.map((task, index) => (
                <tr key={task.uid} className="text-center hover:bg-base-300">
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedTo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TasksList