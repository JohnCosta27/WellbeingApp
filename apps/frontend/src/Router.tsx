import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, Login, Register } from "./Auth";
import { DashboardLayout } from "./DashboardLayout";
import { HowDashboard } from "./HowDashboard";
import { WhoDashboard } from "./WhoDashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/how" />,
          },
          {
            path: "/how",
            element: <HowDashboard />,
          },
          {
            path: "/who",
            element: <WhoDashboard />,
          },
        ],
      },
    ],
  },
]);
