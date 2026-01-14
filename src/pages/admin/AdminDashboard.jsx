import { useAuth } from "../../context/AuthContext";
import { fetchUsers } from "../../api/fetchUsers";
import { fetchTasks } from "../../api/fetchTasks";
import { useQuery } from "@tanstack/react-query";

import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";

const AdminDashboard = () => {
  const { user, loading } = useAuth();

  console.log(user.token)

  // fetch the users data using react query
  const { data: allUsers = [], isPending: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(user.token),
    enabled: !loading && !!user?.token,
  });

  // fetch the tasks data using react query
  const { data: allTasks = [], isPending: isTasksLoading, isError: isTasksError, error: tasksError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(user.token),
    enabled: !loading && !!user?.token,
  });

  return (
    <div className="p-6">
      <button
        className="btn btn-primary mb-4"
        onClick={() => document.getElementById("createTaskModal").showModal()}
      >
        Create Task
      </button>

      <UsersList users={allUsers} isLoading={isUsersLoading} isError={isUsersError} error={usersError} />
      <TasksList tasks={allTasks} isLoading={isTasksLoading} isError={isTasksError} error={tasksError} />
      <CreateTaskModal />
    </div>
  );
};

export default AdminDashboard;
