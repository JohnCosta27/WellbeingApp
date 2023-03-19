import { FC, SyntheticEvent, useCallback, useState }  from "react";

export const Login: FC = () => {
  const [email, setEmail] = useState("");

  const onSubmitEmail = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
    },
    []
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
