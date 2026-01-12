import { Navigate } from "react-router-dom";

/**
 * Returns a <Navigate /> component based on user role.
 * @param {Object} user - The user object from AuthContext
 * @returns {JSX.Element|null}
 */
export const redirectByRole = (user) => {
  if (!user) return null;

  if (user.role === "employee") return <Navigate to="/dashboard" replace />;
  if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;

  return null; // fallback if role unknown
};
