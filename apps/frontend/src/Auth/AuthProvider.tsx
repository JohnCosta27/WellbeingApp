import { createContext, FC, ReactNode, useContext } from "react";
import { auth } from "../FirebaseConfig";

const AuthProviderContext = createContext(auth);
export const useAuth = () => useContext(AuthProviderContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthProviderContext.Provider value={auth}>
      {children}
    </AuthProviderContext.Provider>
  );
};
