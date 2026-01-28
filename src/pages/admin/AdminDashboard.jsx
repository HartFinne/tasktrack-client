import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Stats from "../../components/admin/Stats";

const AdminDashboard = () => {
  const limit = 15;

  return (
    <div className="p-6 text-base-content"> {/* Ensure all text defaults to theme content color */}

      {/* Stats Section */}
      <div className="mb-5">
        <Stats />
      </div>

      {/* Create Task Button */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => document.getElementById("createTaskModal").showModal()}
      >
        Create Task
      </button>

      <CreateTaskModal />


      {/* Users Card */}
      <div className="flex-1 card bg-base-200 shadow">
        <div className="card-body text-base-content">
          <UsersList limit={limit} />
        </div>
      </div>

      {/* Tasks Card */}
      <div className="card-body text-base-content">
        <TasksList limit={limit} />
      </div>


    </div>
  );
};

export default AdminDashboard;