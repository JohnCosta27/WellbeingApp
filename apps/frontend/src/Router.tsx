import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="w-full h-screen bg-base-100 flex justify-center items-center text-5xl">
        Hello Well-being App!
      </div>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
