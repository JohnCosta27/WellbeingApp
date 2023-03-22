import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute, Login, Register } from "./Auth";

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
        index: true,
        element: <App />,
      },
    ],
  },
]);
