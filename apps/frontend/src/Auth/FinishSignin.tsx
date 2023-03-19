import { browserLocalPersistence, isSignInWithEmailLink, signInWithEmailLink } from "@firebase/auth";
import { FC, useEffect } from "react";
import { useAuth } from "./AuthProvider";

export const FinishSignin: FC = () => {
  const auth = useAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = localStorage.getItem("emailForSignIn");
      if (!email) {
        // Not on the same device. TODO.
      } else {
        auth.setPersistence(browserLocalPersistence).then(() => {
          return signInWithEmailLink(auth, email, window.location.href);
        });
      }
    }
  }, []);

  return <>Finishing Sign-in...</>;
};
