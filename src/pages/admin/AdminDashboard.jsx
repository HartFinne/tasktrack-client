import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Stats from "../../components/admin/Stats";
import { useAuth } from "../../context/AuthContext";
import { useQueries } from "@tanstack/react-query";
import { fetchCountTasks } from "../../api/taskApi";
import { fetchCountUsers } from "../../api/userApi";

const AdminDashboard = () => {
  const { user } = useAuth();
  const limit = 15;

  const users = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'employee' },
    { name: 'Charlie', role: 'employee' },
  ];

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

  return (
    <div className="p-1 text-base-content">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-base-content/60">Manage users, tasks, and monitor progress</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("createTaskModal").showModal()}
        >
          Create New Task
        </button>
      </div>

      {/* Stats Section */}
      <div className="mt-2 mb-6">
        <Stats counts={results} />
      </div>

      <CreateTaskModal />


      {/* Users List Card — 70% */}
      <div className="card bg-base-200 shadow mb-3">
        <div className="card-body">
          <UsersList limit={limit} />
        </div>
      </div>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <TasksList limit={limit} />
        </div>
      </div>


    </div >
  );
};

export default AdminDashboard;
