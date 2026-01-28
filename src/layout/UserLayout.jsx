import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Outlet } from "react-router-dom";
import { userConfig } from "../routes/userConfig";

const UserLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8">
        {/* Left: Brand + Mobile Menu */}
        <div className="navbar-start gap-2">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
              {userConfig.map((page) => (
                <li key={page.path}>
                  <NavLink
                    to={page.path}
                    className={({ isActive }) =>
                      isActive ? "active font-semibold" : ""
                    }
                  >
                    {page.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <span className="text-xl font-bold tracking-tight text-primary">
            TaskTrack
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {userConfig.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 font-medium transition ${isActive
                      ? "bg-primary text-primary-content"
                      : "bg-base-200/60 hover:bg-base-300"
                    }`
                  }
                >
                  {page.title}
                </NavLink>


              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="navbar-end">
          <button
            onClick={logout}
            className="btn btn-sm btn-outline btn-error hover:btn-error hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
