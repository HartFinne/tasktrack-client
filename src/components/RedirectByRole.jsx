import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectByRole = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });   // 🔥 key fix
    } else if (user.role === "employee") {
      navigate("/dashboard", { replace: true }); // 🔥 key fix
    } else {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return null; // nothing to render
};

export default RedirectByRole;
