import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUsers } from "../../api/fetchUsers";
import { updateTaskAssignedTo } from "../../api/taskApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Toast from "../../components/Toast"
import FormButton from "../auth/FormButton";


const UpdateAssignModal = ({ task }) => {
  const { user } = useAuth();

  const [assignedUser, setAssignedUser] = useState({
    userId: "",
    email: "",
  });

  const queryClient = useQueryClient();
  const [toastType, setToastType] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users", "assign"],
    queryFn: () => fetchUsers(user.token, 1000),
    enabled: !!user?.token,
  });

  useEffect(() => {
    if (task) {
      setAssignedUser({ userId: "", email: "" });
    }
  }, [task]);



  const mutation = useMutation({
    mutationFn: ({ taskId, userData }) =>
      updateTaskAssignedTo(user.token, taskId, userData),

    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setToastType("success");
      setToastMessage("Task assigned successfully");
      document.getElementById("updateAssignModal").close();
    },

    onError: (error) => {
      setToastType("error");
      setToastMessage(error.message);
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      taskId: task.uid,
      userData: {
        userId: assignedUser.userId,
        userEmail: assignedUser.email,
      },
    });
  };


  return (
    <>
      <Toast
        type={toastType}
        message={toastMessage}
        duration={3000}
        onClose={() => setToastMessage("")}
      />

      <dialog id="updateAssignModal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl mb-4">Assign a Employee</h3>

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
                  <span className="label-text">Assign to (Email)</span>
                </label>

                <select
                  className="select select-bordered w-full"
                  disabled={isLoading}
                  value={assignedUser.userId}
                  onChange={(e) => {
                    const selectedOption = e.target.selectedOptions[0];
                    setAssignedUser({
                      userId: e.target.value,
                      email: selectedOption.dataset.email,
                    });
                  }}
                  required
                >
                  <option value="" disabled>
                    {isLoading ? "Loading users..." : "Select an employee"}
                  </option>

                  {usersData?.users
                    .filter((u) => u.role !== "admin") // <-- exclude admins
                    .map((u) => (
                      <option
                        key={u.uid}
                        value={u.uid}
                        data-email={u.email}
                      >
                        {u.email}
                      </option>
                    ))}
                </select>


              </div>

              <div className="modal-action">
                <button
                  disabled={mutation.isPending}
                  className="btn btn-primary w-28 "
                >
                  {mutation.isPending ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Update Task"
                  )}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("updateAssignModal").close()
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

  )
}

export default UpdateAssignModal