import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// auth pages
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

// user pages
import { userConfig } from "./userConfig.jsx";
import UserLayout from "../layout/UserLayout.jsx";

// admin pages
import { adminConfig } from "./adminConfig.jsx";
import Sidebar from "../layout/Sidebar";

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
  ...userConfig.map((page) => ({
    path: page.path, // top-level path
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <page.component />, title: page.title },
    ],
  })),

  // Admin pages
  ...adminConfig.map((page) => ({
    path: page.path,
    element: (
      <AdminRoute>
        <Sidebar />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <page.component />, title: page.title },
    ]
  })),

]

export const router = createBrowserRouter(routes)