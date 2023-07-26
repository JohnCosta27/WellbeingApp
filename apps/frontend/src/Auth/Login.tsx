/* eslint-disable no-alert */
import { FC, SyntheticEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from ".";
import { AuthRequests } from "../Network";

type LoginProps = {
  logout?: boolean;
};

export const Login: FC<LoginProps> = ({ logout }) => {
  if (logout) {
    setToken("access", "");
    setToken("refresh", "");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const onLogin = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const res = await AuthRequests.login({
        email,
        password,
        // TODO: have different types for login and register
        first_name: "",
        last_name: "",
      });
      if (res.data.type === "error") {
        // TODO: Handle this
        return;
      }

      setToken("access", res.data.body.access);
      setToken("refresh", res.data.body.refresh);

      nav("/");
    },
    [email, password, nav]
  );

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-base-100">
      <h1 className="mb-8 text-5xl">Professional Self Toolkit App</h1>
      <div className="py-16 px-8 max-w-5xl w-96 flex flex-col gap-4 bg-white rounded-xl">
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        first_name: firstName,
        last_name: lastName,
      });

      if (res.data.type === "error") {
        // TODO: Handle this
        return;
      }

      setToken("access", res.data.body.access);
      setToken("refresh", res.data.body.refresh);

      nav("/");
    },
    [email, password, confirmPassword, nav]
  );

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-base-100">
      <h1 className="mb-8 text-5xl">Professional Self Toolkit App</h1>
      <div className="py-16 px-8 max-w-5xl w-96 flex flex-col gap-4 bg-white rounded-xl">
        <input
          type="email"
          className="input"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="name"
          className="input"
          placeholder="First Name..."
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="name"
          className="input"
          placeholder="Last Name..."
          onChange={(e) => setLastName(e.target.value)}
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
