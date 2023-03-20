import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { isTokenValid } from "./isTokenValid";

export const ProtectedRoute: FC = () => {
  if (!isTokenValid('access')) {
    return <Navigate to="/login" />
  }

  return <Outlet />
};
