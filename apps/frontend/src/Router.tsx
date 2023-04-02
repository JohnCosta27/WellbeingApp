import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute, Login, Register } from "./Auth";
import { DashboardLayout } from "./DashboardLayout";
import { HowDashboard } from "./HowDashboard";

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
            element: <></>,
          },
          {
            path: '/how',
            element: <HowDashboard />,
          },
        ]
      },
    ],
  },
]);
