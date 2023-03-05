import { User } from "@firebase/auth";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../FirebaseConfig";

interface UserProviderContextType {
  user: User | null;
  loaded: boolean;
}

const AuthProviderContext = createContext(auth);
const UserProviderContext = createContext<UserProviderContextType>({
  user: null,
  loaded: false,
});

export const useAuth = () => useContext(AuthProviderContext);
export const useUser = () => useContext(UserProviderContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProviderContextType>({
    user: auth.currentUser,
    loaded: false,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser({
        user,
        loaded: true,
      });
    });
  }, []);

  return (
    <AuthProviderContext.Provider value={auth}>
      <UserProviderContext.Provider value={currentUser}>
        {children}
      </UserProviderContext.Provider>
    </AuthProviderContext.Provider>
  );
};
