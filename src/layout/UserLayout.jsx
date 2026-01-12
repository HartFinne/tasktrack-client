// src/layout/UserLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { userConfig } from "../routes/userConfig";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {userConfig.map((page) => (
                <li key={page.path}> {/* ✅ Add key */}
                  <Link to={page.path}>{page.title}</Link>
                </li>
              ))}

            </ul>
          </div>
          <a className="btn btn-ghost text-xl">TaskTrack</a>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {userConfig.map((page) => (
              <li key={page.path}> {/* ✅ Add key */}
                <Link to={page.path}>{page.title}</Link>
              </li>
            ))}

          </ul>
        </div>

        <div className="navbar-end">
          <a className="btn">Logout</a>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
