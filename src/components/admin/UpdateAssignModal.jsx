import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUsers } from "../../api/fetchUsers";
import { updateTaskAssignedTo } from "../../api/taskApi";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "../../components/Toast";

const limit = 50; // users per batch

const UpdateAssignModal = ({ task }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [assignedUser, setAssignedUser] = useState({ userId: "", email: "" });
  const [toastType, setToastType] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Reset selection when task changes
  useEffect(() => {
    if (task) setAssignedUser({ userId: "", email: "" });
  }, [task]);

  // Infinite query for users
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isUsersLoading,
  } = useInfiniteQuery({
    queryKey: ["users", "assign"],
    queryFn: ({ pageParam = null }) => fetchUsers(user.token, limit, pageParam),
    getNextPageParam: (lastPage) => lastPage.lastUid || undefined,
    enabled: !!user?.token,
    staleTime: 60 * 1000, // 1 min
  });

  // Flatten pages and exclude admins
  const users = data
    ? data.pages.flatMap((page) => page.users.filter((u) => u.role !== "admin"))
    : [];

  // Mutation to assign task
  const mutation = useMutation({
    mutationFn: ({ taskId, userData }) =>
      updateTaskAssignedTo(user.token, taskId, userData),

    //  OPTIMISTIC UPDATE
    onMutate: async ({ taskId, userData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // Snapshot previous data
      const previousTasks = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      // Optimistically update ALL task pages
      previousTasks.forEach(([queryKey, data]) => {
        if (!data) return;

        queryClient.setQueryData(queryKey, {
          ...data,
          tasks: data.tasks.map((task) =>
            task.uid === taskId
              ? {
                ...task,
                assignedTo: userData.userId,
                assignedEmail: userData.userEmail,
              }
              : task
          ),
        });
      });

      return { previousTasks };
    },

    //  ROLLBACK ON ERROR
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        context.previousTasks.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      setToastType("error");
      setToastMessage("Failed to assign task");
    },

    //  FINALIZE
    onSuccess: () => {
      setToastType("success");
      setToastMessage("Task assigned successfully");
      document.getElementById("updateAssignModal").close();
    },

    //  SYNC WITH SERVER
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
          <h3 className="font-bold text-xl mb-4">Assign an Employee</h3>

          {task && (
            <form key={task.uid} onSubmit={handleSubmit} className="space-y-4">
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
                  value={assignedUser.userId}
                  onChange={(e) => {
                    if (e.target.value === "LOAD_MORE") {
                      fetchNextPage();
                    } else {
                      const selectedOption = e.target.selectedOptions[0];
                      setAssignedUser({
                        userId: e.target.value,
                        email: selectedOption.dataset.email,
                      });
                    }
                  }}
                  required
                >
                  <option value="" disabled>
                    {isUsersLoading && users.length === 0
                      ? "Loading users..."
                      : "Select an employee"}
                  </option>

                  {users.map((u) => (
                    <option key={u.uid} value={u.uid} data-email={u.email}>
                      {u.email}
                    </option>
                  ))}

                  {hasNextPage && (
                    <option value="LOAD_MORE" className="text-gray-500">
                      {isFetchingNextPage ? "Loading..." : "Load more..."}
                    </option>
                  )}
                </select>
              </div>

              <div className="modal-action">
                <button
                  disabled={mutation.isPending}
                  className="btn btn-primary w-28"
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
  );
};

export default UpdateAssignModal;
