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
  const [checked, setChecked] = useState(0);

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
      <div className="max-w-5xl flex flex-col gap-4 my-4">
        <h2 className="text-2xl">PST Consent Statement</h2>
        <p>
          I understand that by using this Professional Self Toolkit App (‘the
          App’) that I will be entering personal data about myself that will be
          collected and stored for the purpose of providing me with the features
          and functionality of this product and for no other purpose.
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => setChecked((c) => c + (e.target.checked ? 1 : -1))}
          />
        </p>

        <p>
          I consent to my personal data being collected and stored by the App
          hosting company Microsoft Azure (server managed by John Costa) for the
          purposes of providing me with the features, functionality and
          operation of this product.
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => setChecked((c) => c + (e.target.checked ? 1 : -1))}
          />
        </p>

        <p>
          I understand that my personal data will not be shared with third
          parties.
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => setChecked((c) => c + (e.target.checked ? 1 : -1))}
          />
        </p>
        <p>
          I understand that my use of this product is voluntary and that I can
          withdraw my consent at any time and delete my data by selecting the
          ‘delete data’ feature in this App without giving any notice or reason
          for leaving.
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => setChecked((c) => c + (e.target.checked ? 1 : -1))}
          />
        </p>
      </div>
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
        {checked !== 4 && (
          <p className="text-warning">
            You must check all the consent boxes before registering.
          </p>
        )}
        <button
          disabled={checked !== 4}
          type="submit"
          className="btn btn-primary"
          onClick={onLogin}
        >
          Register
        </button>
      </div>
    </div>
  );
};
