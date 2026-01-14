import { useAuth } from "../../context/AuthContext";

import { fetchUsers } from "../../api/fetchUsers";
import { fetchTasks } from "../../api/fetchTasks";

import { createTask } from "../../api/createTask";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  // Fetch users using React Query
  const { data: allUsers = [], isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(user.token),
    enabled: !loading && !!user?.token,
  });

  console.log("Users", allUsers)

  // Fetch tasks
  const { data: allTasks = [], isLoadingTasks, isErrorTasks, errorTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(user.token),
    enabled: !loading && !!user?.token
  })

  console.log("Tasks", allTasks)

  // Create a new task
  const mutation = useMutation({
    mutationFn: (newTask) => createTask(user.token, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (error) => {
      console.error("Failed to create task: ", error.message)
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const description = form.description.value

    mutation.mutate({ title, description })

    form.reset()

    document.getElementById("createTaskModal").close()
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("createTaskModal").showModal()}
      >
        Create Task
      </button>

      {/* MODAL */}
      <dialog id="createTaskModal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-xl mb-4">Create New Task</h3>

          <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Task Title</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter task title"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Enter task description"
                rows={4}
              ></textarea>
            </div>

            <div className="modal-action">
              <button className="btn btn-primary" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Task"}
              </button>
              <button className="btn">Cancel</button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AdminDashboard;
