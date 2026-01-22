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
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Users</h2>

        <Pagination
          onNext={() => nextPage(usersData.lastUid)}
          onPrev={prevPage}
          hasNext={!!usersData.lastUid}
          hasPrev={hasPrev}
          page={page}
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
            {isPending && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="text-center">
                <td><div className="skeleton h-4 w-6 mx-auto"></div></td>
                <td><div className="skeleton h-4 w-40 mx-auto"></div></td>
                <td><div className="skeleton h-4 w-24 mx-auto"></div></td>
              </tr>
            ))}

            {isError && (
              <tr>
                <td colSpan={3} className="text-center text-red-600">
                  Error loading users: {error.message}
                </td>
              </tr>
            )}

            {!isPending && !isError && usersData.users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}

            {!isPending && !isError && usersData.users.map((userItem, index) => (
              <tr key={userItem.uid} className="text-center hover:bg-base-300">
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{userItem.email}</td>
                <td><span className="badge badge-info">{userItem.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
