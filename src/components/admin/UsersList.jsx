import Pagination from "../../components/admin/Pagination";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchUsers } from "../../api/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const UsersList = ({ limit }) => {
  const { user } = useAuth();

  // User pagination
  const {
    lastUid: lastUserUid,
    page: userPage,
    hasPrev: userHasPrev,
    nextPage: userNextPage,
    prevPage: userPrevPage,
  } = useCursorPagination();

  // fetch the users data using react query
  const { data: usersData = { users: [], lastUid: null }, isPending, isError, error } = useQuery({
    queryKey: ["users", lastUserUid],
    queryFn: () => fetchUsers(user.token, limit, lastUserUid),
    staleTime: Infinity,
    enabled: !!user?.token,
  });


  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Users</h2>

        <Pagination
          onNext={() => userNextPage(usersData.lastUid)}
          onPrev={userPrevPage}
          hasNext={!!usersData.lastUid}
          hasPrev={userHasPrev}
          page={userPage}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {/* Loading Skeleton */}
            {isPending &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="text-center">
                  <td>
                    <div className="skeleton h-4 w-6 mx-auto"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-40 mx-auto"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-24 mx-auto"></div>
                  </td>
                </tr>
              ))}

            {/* Error */}
            {isError && (
              <tr>
                <td colSpan={3} className="text-center text-red-600">
                  Error loading users: {error.message}
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!isPending && !isError && usersData.users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}

            {/* Actual data */}
            {!isPending &&
              !isError &&
              usersData.users.map((user, index) => (
                <tr key={user.uid} className="text-center hover:bg-base-300">
                  <td>{(userPage - 1) * limit + index + 1}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-info">{user.role}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UsersList;
