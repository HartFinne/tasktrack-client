import { useAuth } from "../../context/AuthContext";
import { fetchUsers } from "../../api/fetchUsers";
import { fetchTasks } from "../../api/fetchTasks";
import { useQuery } from "@tanstack/react-query";

import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Pagination from "../../components/admin/Pagination";
import { useState } from "react";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [taskPage, setTaskPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const limit = 5;


  console.log(user.token)

  // fetch the users data using react query
  const { data: allUsers = [], isPending: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
    queryKey: ["users", userPage],
    queryFn: () => fetchUsers(user.token, userPage, limit),
    enabled: !loading && !!user?.token,
  });

  // fetch the tasks data using react query
  const { data: allTasks = [], isPending: isTasksLoading, isError: isTasksError, error: tasksError } = useQuery({
    queryKey: ["tasks", taskPage],
    queryFn: () => fetchTasks(user.token, taskPage, limit),
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

      <UsersList users={allUsers} isLoading={isUsersLoading} isError={isUsersError} error={usersError} page={userPage}
        limit={limit} />

      <Pagination
        page={userPage}
        setPage={setUserPage}
        hasNext={allUsers.length === limit}
      />

      <TasksList tasks={allTasks} isLoading={isTasksLoading} isError={isTasksError} error={tasksError} page={taskPage}
        limit={limit} />

      <Pagination
        page={taskPage}
        setPage={setTaskPage}
        hasNext={allTasks.length === limit}
      />

      <CreateTaskModal />
    </div>
  );
};

export default AdminDashboard;
