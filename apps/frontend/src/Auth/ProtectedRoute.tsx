import { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { useUser } from "./AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loaded } = useUser();

  if (!loaded) {
    return <>Loading...</>;
  }

  if (!user && loaded) {
    return <Navigate to="/login" />
  }

  return <>{children}</>;
};
