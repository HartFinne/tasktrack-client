import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// auth pages
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

// user pages
import Dashboard from "../pages/user/Dashboard";

// admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";

// protected routes
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  // User pages
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },

  // Admin pages
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    )
  }
]

export const router = createBrowserRouter(routes)