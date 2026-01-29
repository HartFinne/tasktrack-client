import Pagination from "../Pagination";
import Filter from "./Filter";
import { useCursorPagination } from "../../hooks/useCursorPagination";
import { fetchUsers } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const UsersList = ({ limit }) => {
  const { user } = useAuth();
  const [roleFilter, setRoleFilter] = useState("all");
  const USER_ROLE = ["all", "employee", "admin"];

  // Cursor pagination for users
  const { lastUid, page, hasPrev, nextPage, prevPage, resetPagination } = useCursorPagination();

  const { data: usersData = { users: [], lastUid: null, hasNext: false }, isPending, isError, error } = useQuery({
    queryKey: ["users", lastUid, roleFilter],
    queryFn: () => fetchUsers(user.token, limit, lastUid, roleFilter),
    staleTime: 60 * 1000,
    enabled: !!user?.token,
  });

  return (
    <div className="mt-0.5 space-y-4 w-full text-base-content">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold">
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
        <Filter
          options={USER_ROLE}
          value={roleFilter}
          onChange={(newStatus) => {
            setRoleFilter(newStatus);
            resetPagination();
          }}
        />
      </div>

      {/* TABLE CONTAINER */}
      <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl shadow-sm">
        <table className="table">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton Loader */}
            {isPending &&
              Array.from({ length: limit }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td><div className="h-4 w-48 bg-base-300 rounded"></div></td>
                  <td><div className="h-6 w-20 bg-base-300 rounded"></div></td>
                </tr>
              ))}

            {/* Error */}
            {isError && (
              <tr>
                <td colSpan="3" className="text-center text-error py-6">
                  Error loading users: {error.message}
                </td>
              </tr>
            )}

            {/* Empty State */}
            {!isPending && !isError && usersData.users.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-base-content/70 py-6">
                  No users found.
                </td>
              </tr>
            )}

            {/* Users */}
            {!isPending &&
              !isError &&
              usersData.users.map((userItem) => (
                <tr key={userItem.uid} className="hover:bg-base-200 cursor-pointer">
                  <td className="font-medium w-[50%]">{userItem.email}</td>

                  <td>
                    <span className="capitalize">
                      {userItem.role}
                    </span>
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Pagination
          onNext={() => nextPage(usersData.lastUid)}
          onPrev={prevPage}
          hasNext={usersData.hasNext}
          hasPrev={hasPrev}
          page={page}
        />
      </div>
    </div>
  );
};

export default UsersList;