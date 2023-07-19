import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, Login, Register } from "./Auth";
import { DashboardLayout } from "./DashboardLayout";
import { HowDashboard } from "./HowDashboard";
import { MyProgress } from "./MyProgress";
import { WhoDashboard } from "./WhoDashboard";
import MyCV from "./MyCV";
import { Community } from "./Community";
import { MySkills } from "./MySkills";
import HomePage from "./HomePage";
import { Settings } from "./Settings";
import { MyProfessionalSelf } from "./MyProfessionalSelf";

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
    path: "/logout",
    element: <Login logout />,
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
            element: <HomePage />,
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
          {
            path: "/professional-self",
            element: <MyProfessionalSelf />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
