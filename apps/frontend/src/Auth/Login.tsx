import { FC, SyntheticEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from ".";
import { AuthRequests } from "../Network";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const onLogin = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const res = await AuthRequests.login({
        email,
        password,
      });
      if (res.data.type === "error") {
        //TODO: Handle this
        return;
      }

      setToken("access", res.data.body.access);
      setToken("refresh", res.data.body.refresh);

      nav("/");
    },
    [email, password, nav]
  );

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-base-300">
      <div className="py-16 px-8 max-w-5xl flex flex-col gap-4 bg-neutral rounded-xl">
        <input
          type="email"
          className="input"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const onLogin = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (!(confirmPassword === password)) {
        alert("Passwords don't match");
        return;
      }

      const res = await AuthRequests.register({
        email,
        password,
      });

      if (res.data.type === "error") {
        //TODO: Handle this
        return;
      }

      setToken("access", res.data.body.access);
      setToken("refresh", res.data.body.refresh);

      nav("/");
    },
    [email, password, nav]
  );

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-base-300">
      <div className="py-16 px-8 max-w-5xl flex flex-col gap-4 bg-neutral rounded-xl">
        <input
          type="email"
          className="input"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Confirm Password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" onClick={onLogin}>
          Register
        </button>
      </div>
    </div>
  );
};
