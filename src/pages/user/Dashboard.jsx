
import UserTasksList from "../../components/user/UserTasksList";
import TaskSkeleton from "../../components/user/TaskSkeleton"
import { Suspense } from "react";

const Dashboard = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      <Suspense fallback={<TaskSkeleton />}>
        <UserTasksList />
      </Suspense>

    </div >
  );
};


export default Dashboard