import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Loading from "../../components/Loading";

import { Suspense } from "react";

const AdminDashboard = () => {
  const limit = 10;

  return (
    <div className="p-6">
      <button
        className="btn btn-primary mb-4"
        onClick={() => document.getElementById("createTaskModal").showModal()}
      >
        Create Task
      </button>

      <CreateTaskModal />

      {/* Separate Suspense for Users */}
      <Suspense fallback={<Loading message="Loading users..." />}>
        <UsersList limit={limit} />
      </Suspense>

      {/* Separate Suspense for Tasks */}
      <Suspense fallback={<Loading message="Loading tasks..." />}>
        <TasksList limit={limit} />
      </Suspense>
    </div>
  );
};

export default AdminDashboard;
