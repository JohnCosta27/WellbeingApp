import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute, Login } from "./Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
