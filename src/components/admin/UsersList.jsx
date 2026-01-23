import Pagination from "../../components/admin/Pagination";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchUsers } from "../../api/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const UsersList = ({ limit }) => {
  const { user } = useAuth();

  // Cursor pagination for users
  const { lastUid, page, hasPrev, nextPage, prevPage } = useCursorPagination();

  const { data: usersData = { users: [], lastUid: null }, isPending, isError, error } = useQuery({
    queryKey: ["users", lastUid],
    queryFn: () => fetchUsers(user.token, limit, lastUid),
    staleTime: 60 * 1000,
    enabled: !!user?.token,
  });

  return (
    <div className="mt-2 space-y-4 w-full text-base-content">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
          Users
        </div>

        <Pagination
          onNext={() => nextPage(usersData.lastUid)}
          onPrev={prevPage}
          hasNext={!!usersData.lastUid}
          hasPrev={hasPrev}
          page={page}
        />
      </div>
      {/* Skeleton loader */}
      {isPending &&
        Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="p-3 rounded-lg border border-base-300 bg-base-200 animate-pulse"
          >
            <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
            <div className="h-4 w-16 bg-base-300 rounded"></div>
          </div>
        ))}

      {/* Error */}
      {isError && (
        <div className="text-center text-error">Error loading users: {error.message}</div>
      )}

      {/* No users */}
      {!isPending && !isError && usersData.users.length === 0 && (
        <div className="text-center text-base-content/70">No users found.</div>
      )}

      {/* User list */}
      {!isPending &&
        !isError &&
        usersData.users.map((userItem) => (
          <div
            key={userItem.uid}
            className="p-3 rounded-lg border border-base-300 hover:bg-base-300 transition-colors bg-base-100 min-h-16"
          >

            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              <p className="font-medium text-base-content">{userItem.email}</p>
              <span className="badge badge-outline">{userItem.role}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UsersList;