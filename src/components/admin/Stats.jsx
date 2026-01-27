import { useAuth } from "../../context/AuthContext";
import { useQueries } from "@tanstack/react-query";
import { fetchCountTasks } from "../../api/taskApi";
import { fetchCountUsers } from "../../api/userApi";

const Stats = () => {

  const { user } = useAuth();

  // Fetch users and tasks in parallel
  const results = useQueries({
    queries: [
      {
        queryKey: ["users"],
        queryFn: () => fetchCountUsers(user.token),
        enabled: !!user?.token,
      },
      {
        queryKey: ["statTasks"],
        queryFn: () => fetchCountTasks(user.token),
        enabled: !!user?.token,
      },
    ],
  });

  const [userCountsResult, taskCountsResult] = results;
  const totalTasksData = taskCountsResult.data?.totalTasks || {};

  // Extract stats
  const totalUsers = userCountsResult.data?.totalUsers || 0;
  const totalTasks = totalTasksData.all || 0;
  const inProgress = totalTasksData.in_progress || 0;
  const done = totalTasksData.done || 0;


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
        <div className="stat-value">
          {userCountsResult.isPending ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : userCountsResult.isError ? (
            <span className="text-red-500">Error</span>
          ) : (
            totalUsers
          )}
        </div>
        <div className="stat-desc">All registered users</div>
      </div>

      {/* Total Tasks */}
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
              d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
        </div>
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value">
          {taskCountsResult.isPending ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : userCountsResult.isError ? (
            <span className="text-red-500">Error</span>
          ) : (
            totalTasks
          )}
        </div>
        <div className="stat-desc">All created tasks</div>
      </div>

      {/* In Progress */}
      <div className="stat">
        <div className="stat-figure text-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
          </svg>

        </div>
        <div className="stat-title">In Progress</div>
        <div className="stat-value">
          {taskCountsResult.isPending ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : userCountsResult.isError ? (
            <span className="text-red-500">Error</span>
          ) : (
            inProgress
          )}
        </div>
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
        <div className="stat-value">
          {taskCountsResult.isPending ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : taskCountsResult.isError ? (
            <span className="text-red-500">Error</span>
          ) : (
            done
          )}
        </div>
        <div className="stat-desc">Completed tasks</div>
      </div>
    </div>

  )
}

export default Stats