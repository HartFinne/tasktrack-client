import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Stats from "../../components/admin/Stats";
import UsersPieChart from "../../components/admin/UsersPieChart";
import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const limit = 15;

  const users = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'employee' },
    { name: 'Charlie', role: 'employee' },
  ];

  return (
    <div className="p-6 text-base-content">

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
        <Stats />
      </div>

      <CreateTaskModal />
      <div className="flex flex-col lg:flex-row gap-1 items-start mb-1">

        {/* Users List Card — 70% */}
        <div className="card bg-base-200 shadow w-full lg:w-[65%] min-w-0">
          <div className="card-body">
            <UsersList limit={limit} />
          </div>
        </div>

        {/* Pie Chart Card — 30% */}
        <div className="card bg-base-200 shadow w-full lg:w-[35%] min-w-0">
          <div className="card-body items-center">
            <UsersPieChart users={users} />
          </div>
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
