import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 transition-opacity duration-300">
      <Loading message="Loading..." fullScreen={true} />
    </div>);

  if (!user) return <Navigate to="/" replace />; // not logged in
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />; // not admin

  return children;
}
