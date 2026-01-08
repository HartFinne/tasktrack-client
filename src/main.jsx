import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import ProtectedRoute from './components/ProtectedRoute copy.jsx'

import Dashboard from './pages/user/Dashboard.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

const router = createBrowserRouter([
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
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
