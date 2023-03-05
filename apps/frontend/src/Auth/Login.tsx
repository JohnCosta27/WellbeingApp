import { sendSignInLinkToEmail } from "@firebase/auth";
import { FC, SyntheticEvent, useCallback, useState } from "react";
import { auth } from "../FirebaseConfig";

export const Login: FC = () => {
  const [email, setEmail] = useState("");

  const onSubmitEmail = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    await sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:5173/',
      handleCodeInApp: true,
    }).catch(e => console.log("Error has occured: ", e));
  }, []);
  
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <input
        type="email"
        className="input"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn" onClick={onSubmitEmail} />
    </div>
  );
};
