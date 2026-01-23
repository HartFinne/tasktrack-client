import UserTasksList from "../../components/user/UserTasksList";

const Dashboard = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center justify-center">My Tasks</h1>

      <UserTasksList />

    </div >
  );
};


export default Dashboard