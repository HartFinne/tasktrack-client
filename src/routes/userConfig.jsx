// src/routes/pagesConfig.js
import Dashboard from "../pages/user/Dashboard";
import Setting from "../pages/user/Setting";

export const userConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    title: "Settings",
    path: "/settings",
    component: Setting,
  },

  // add more if needed
];
