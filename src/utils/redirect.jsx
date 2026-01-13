import { Navigate } from "react-router-dom";


export const redirectByRole = (user) => {
  if (!user) return null;

  if (user.role === "employee") return <Navigate to="/dashboard" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return null; // fallback if role unknown
};
