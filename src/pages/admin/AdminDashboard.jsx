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

      {/* Tabs */}
      <div className="flex gap-2.5 mb-6">
        {["overview", "users", "tasks"].map((tab) => (
          <button
            key={tab}
            className={`btn btn-sm ${activeTab === tab ? "btn-primary" : "btn-outline"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <UsersPieChart users={users} />
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="card bg-base-300 shadow">
          <div className="card-body">
            <UsersList limit={limit} />
          </div>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="card bg-base-300 shadow">
          <div className="card-body">
            <TasksList limit={limit} />
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
