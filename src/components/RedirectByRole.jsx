// RedirectByRole.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectByRole = () => {
  const { user } = useAuth();

  if (!user) return null;


  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "employee") {
    return <Navigate to="/dashboard" replace />;
  }

  return null;
};

export default RedirectByRole;
