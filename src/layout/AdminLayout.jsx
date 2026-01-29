import { useAuth } from "../context/AuthContext.jsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react"; // assuming React 18 Activity API

import { adminConfig } from "../routes/adminConfig";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  // Find the current page by matching location
  const currentPage = adminConfig.find(
    (page) => page.path === location.pathname
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold">{currentPage?.title || "Page"}</div>
        </nav>

        {/* Main Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">

          <ul className="menu w-full grow">
            <li>
              <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right " data-tip={"TaskTrack"}>
                <p className="my-1.5 inline-block size-4 font-bold ">TT</p>
                <span className="is-drawer-close:hidden">TaskTrack</span>
              </span>
            </li>

            <span className="divider my-0.5 mr-1"></span>

            {adminConfig.map((page) => (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className={`is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center rounded-lg transition-colors ${location.pathname === page.path
                    ? "bg-primary text-primary-content"
                    : ""
                    }`}
                  data-tip={page.title}
                >
                  {page.icon}
                  <span className="is-drawer-close:hidden">{page.title}</span>
                </Link>
              </li>
            ))}

            <li className="mb-2 flex justify-end items-end">
              <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-error hover:text-white transition-colors duration-200" data-tip={"Logout"} onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="my-1.5 inline-block size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>

                <span className="is-drawer-close:hidden">Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};

export default Sidebar;
