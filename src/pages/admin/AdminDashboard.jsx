import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Stats from "../../components/admin/Stats";

const AdminDashboard = () => {
  const limit = 15;

  return (
    <div className="p-6">

      <div className="mb-5">
        <Stats></Stats>
      </div>

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
