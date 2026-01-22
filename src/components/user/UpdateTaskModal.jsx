import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
// api
import { updateTaskStatus } from "../../api/taskApi";

import Toast from "../../components/Toast"

const UpdateTaskModal = ({ task }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [toastType, setToastType] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  const mutation = useMutation({
    mutationFn: (updateStatus) => updateTaskStatus(user.token, task.uid, updateStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      document.getElementById("updateStatusModal").close();
      setToastType("success");
      setToastMessage("Succesfully updated status!");
    },
    onError: (err) => {
      setToastType("error");
      console.log(err.message)
      setToastMessage("Failed to update task status");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ status });
  };

  return (
    <>
      <Toast
        type={toastType}
        message={toastMessage}
        duration={3000}
        onClose={() => setToastMessage("")}
      />

      <dialog id="updateStatusModal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-xl mb-4">Update Status</h3>

          {task && (
            <form
              key={task.uid}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="label">
                  <span className="label-text">Task</span>
                </label>
                <p className="font-semibold">{task.title}</p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled={status === "backlog"} value="backlog">Backlog</option>
                  <option disabled={status === "in_progress"} value="in_progress">In-Progress</option>
                  <option disabled={status === "done"} value="done">Done</option>
                </select>
              </div>

              <div className="modal-action">
                <button disabled={mutation.isPending} className="btn btn-primary">
                  {mutation.isPending ? "Saving..." : "Update Status"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("updateStatusModal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default UpdateTaskModal