import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute, FinishSignin, Login } from "./Auth";

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
  {
    path: "/complete-auth",
    element: <FinishSignin />,
  }
]);
