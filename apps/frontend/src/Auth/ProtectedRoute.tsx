import { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  if (false) {
    return <Navigate to="/login" />
  }

  return <>{children}</>;
};
