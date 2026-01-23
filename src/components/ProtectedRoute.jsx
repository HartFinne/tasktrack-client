import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show a loading state while checking auth
  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 transition-opacity duration-300">
      <Loading message="Loading dashboard..." fullScreen={true} />
    </div>);

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/" replace />;

  // If logged in, render children
  return children;
}
