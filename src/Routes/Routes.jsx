import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { routesConfig } from "./RouteConfig";
import ProtectedRoute from "./ProtectRoute";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        {routesConfig.map(({ path, component: Component }, index) => {
          if (path === "/dashboard") {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                }
              />
            );
          }

          return <Route key={index} path={path} element={<Component />} />;
        })}
      </Routes>
    </Router>
  );
};

export default MainRoute;
