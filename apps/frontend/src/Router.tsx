import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, Login, Register } from "./Auth";
import { DashboardLayout } from "./DashboardLayout";
import { HowDashboard } from "./HowDashboard";
import { MyProgress } from "./MyProgress";
import { WhoDashboard } from "./WhoDashboard";
import MyCV from "./MyCV";
import { Community } from "./Community";
import { MySkills } from "./MySkills";

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
          {
            path: "/progress",
            element: <MyProgress />,
          },
          {
            path: "/mycv",
            element: <MyCV />,
          },
          {
            path: "/myskills",
            element: <MySkills />,
          },
          {
            path: "/community",
            element: <Community />,
          },
        ],
      },
    ],
  },
]);
