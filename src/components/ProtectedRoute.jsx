import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show a loading state while checking auth
  if (loading) return <p>Loading...</p>;

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/" replace />;

  // if (user.role !== "employee") return <Navigate to="/" replace />;

  // If logged in, render children
  return children;
}
