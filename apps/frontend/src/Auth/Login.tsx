import { sendSignInLinkToEmail } from "@firebase/auth";
import { FC, SyntheticEvent, useCallback, useState } from "react";
import { useAuth } from "./AuthProvider";

export const Login: FC = () => {
  const [email, setEmail] = useState("");

  const auth = useAuth();

  const onSubmitEmail = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:5173/complete-auth",
        handleCodeInApp: true,
      })
        .then(() => window.localStorage.setItem("emailForSignIn", email))
        .catch((e) => console.log("Error has occured: ", e));
    },
    [email, auth]
  );

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <input
        type="email"
        className="input"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn" onClick={onSubmitEmail}>
        Send Email
      </button>
    </div>
  );
};
