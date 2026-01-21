import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";

const AdminDashboard = () => {
  const limit = 15;

  return (
    <div className="p-6">
      <button
        className="btn btn-primary mb-4"
        onClick={() => document.getElementById("createTaskModal").showModal()}
      >
        Create Task
      </button>

      <CreateTaskModal />

      <UsersList limit={limit} />

      <TasksList limit={limit} />

    </div>
  );
};

export default AdminDashboard;
