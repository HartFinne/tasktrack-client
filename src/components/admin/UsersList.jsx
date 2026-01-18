const UsersList = ({ users, isLoading, isError, error, limit, page }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Users</h2>

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
            {isLoading &&
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
            {!isLoading && !isError && users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}

            {/* Actual data */}
            {!isLoading &&
              !isError &&
              users.map((user, index) => (
                <tr key={user.uid} className="text-center hover:bg-base-300">
                  <td>{(page - 1) * limit + index + 1}</td>
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
