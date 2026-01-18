import { useAuth } from "../../context/AuthContext";
import { fetchUsers } from "../../api/fetchUsers";
import { fetchTasks } from "../../api/fetchTasks";
import { useQuery } from "@tanstack/react-query";

import UsersList from "../../components/admin/UsersList";
import TasksList from "../../components/admin/TasksList";
import CreateTaskModal from "../../components/admin/CreateTaskModal";
import Pagination from "../../components/admin/Pagination";
import { useCursorPagination } from "../../hooks/useCursorPagination";

const AdminDashboard = () => {
  const { user } = useAuth();
  const limit = 10;

  // User pagination
  const {
    lastUid: lastUserUid,
    page: userPage,
    hasPrev: userHasPrev,
    nextPage: userNextPage,
    prevPage: userPrevPage,
  } = useCursorPagination(limit);

  // Task pagination
  const {
    lastUid: lastTaskUid,
    page: taskPage,
    hasPrev: taskHasPrev,
    nextPage: taskNextPage,
    prevPage: taskPrevPage,
  } = useCursorPagination(limit);


  console.log(user.token)

  // fetch the users data using react query
  const { data: usersData = { users: [], lastUid: null }, isPending: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
    queryKey: ["users", lastUserUid],
    queryFn: () => fetchUsers(user.token, limit, lastUserUid),
    enabled: !!user?.token,
  });

  console.log(usersData.users)

  // fetch the tasks data using react query
  const { data: tasksData = { tasks: [], lastUid: null }, isPending: isTasksLoading, isError: isTasksError, error: tasksError } = useQuery({
    queryKey: ["tasks", lastTaskUid],
    queryFn: () => fetchTasks(user.token, limit, lastTaskUid),
    enabled: !!user?.token,
  });

  return (
    <div className="p-6">
      <button
        className="btn btn-primary mb-4"
        onClick={() => document.getElementById("createTaskModal").showModal()}
      >
        Create Task
      </button>

      <CreateTaskModal />

      <UsersList users={usersData.users} isLoading={isUsersLoading} isError={isUsersError} error={usersError} limit={limit} page={userPage} />

      <Pagination
        onNext={() => userNextPage(usersData.lastUid)}
        onPrev={userPrevPage}
        hasNext={!!usersData.lastUid}
        hasPrev={userHasPrev}
        page={userPage}
      />

      <TasksList tasks={tasksData.tasks} isLoading={isTasksLoading} isError={isTasksError} error={tasksError} limit={limit} page={taskPage} />

      <Pagination
        onNext={() => taskNextPage(tasksData.lastUid)}
        onPrev={taskPrevPage}
        hasNext={!!tasksData.lastUid}
        hasPrev={taskHasPrev}
        page={taskPage}
      />
    </div>
  );
};

export default AdminDashboard;
