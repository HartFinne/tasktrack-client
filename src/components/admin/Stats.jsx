import { useAuth } from "../../context/AuthContext";
import { useQueries } from "@tanstack/react-query";
import { fetchTasks } from "../../api/taskApi";
import { fetchUsers } from "../../api/fetchUsers";

const Stats = () => {

  const { user } = useAuth();

  // Fetch users and tasks in parallel
  const results = useQueries({
    queries: [
      {
        queryKey: ["statsUsers"],
        queryFn: () => fetchUsers(user.token), // no limit
        enabled: !!user?.token,
      },
      {
        queryKey: ["statsTasks"],
        queryFn: () => fetchTasks(user.token), // no limit
        enabled: !!user?.token,
      },
    ],
  });

  const [usersResult, tasksResult] = results;

  // Loading / error handling
  if (usersResult.isLoading || tasksResult.isLoading) {
    return <p>Loading stats...</p>;
  }

  if (usersResult.isError) return <p>Error loading users: {usersResult.error.message}</p>;
  if (tasksResult.isError) return <p>Error loading tasks: {tasksResult.error.message}</p>;

  // Calculate stats
  const totalUsers = usersResult.data?.users?.length || 0;
  const totalTasks = tasksResult.data?.tasks?.length || 0;

  const inProgress = tasksResult.data?.tasks?.filter(t => t.status === "in_progress").length || 0;
  const done = tasksResult.data?.tasks?.filter(t => t.status === "done").length || 0;

  return (
    <div className="stats shadow w-full">
      {/* Total Users */}
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
        </div>
        <div className="stat-title">Total Users</div>
        <div className="stat-value">{totalUsers}</div>
        <div className="stat-desc">All registered users</div>
      </div>

      {/* Total Tasks */}
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
        </div>
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value">{totalTasks}</div>
        <div className="stat-desc">All created tasks</div>
      </div>

      {/* In Progress */}
      <div className="stat">
        <div className="stat-figure text-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6l4 2"
            />
          </svg>
        </div>
        <div className="stat-title">In Progress</div>
        <div className="stat-value">{inProgress}</div>
        <div className="stat-desc">Currently being worked on</div>
      </div>

      {/* Done */}
      <div className="stat">
        <div className="stat-figure text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="stat-title">Done</div>
        <div className="stat-value">{done}</div>
        <div className="stat-desc">Completed tasks</div>
      </div>
    </div>

  )
}

export default Stats