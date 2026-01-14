import { useAuth } from "../../context/AuthContext";
import { createTask } from "../../api/createTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateTaskModal = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask) => createTask(user.token, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      document.getElementById("createTaskModal").close();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    mutation.mutate({ title, description });
    e.target.reset();
  };

  return (
    <dialog id="createTaskModal" className="modal">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-4">Create New Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Task title"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Task description"
            className="textarea textarea-bordered w-full"
            rows={4}
          />

          <div className="modal-action">
            <button disabled={mutation.isPending} className="btn btn-primary">
              {mutation.isPending ? "Saving..." : "Save Task"}
            </button>
            <button type="button" className="btn" onClick={() => document.getElementById("createTaskModal").close()}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreateTaskModal;
