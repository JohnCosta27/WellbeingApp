import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute, Login } from "./Auth";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
