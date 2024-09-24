import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Unauthorized from "../utils/Error/Unauthorized";

export const routesConfig = [
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/dashboard", component : Dashboard},
  { path: "/unauthorized", component : Unauthorized}
];
