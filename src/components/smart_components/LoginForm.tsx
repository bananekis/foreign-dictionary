import { useState } from "react";

type Props = {
  defaultUser: {
    name: string;
    password: string;
  };
  isLoggedIn: boolean;
  onLogin: () => void;
  children: JSX.Element;
};

export const LoginForm = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { defaultUser, isLoggedIn, onLogin } = props;

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSignIn = () => {
    if (username !== defaultUser.name || password !== defaultUser.password) {
      return;
    }

    setUsername("");
    setPassword("");
    onLogin();
  };

  if (isLoggedIn === true) {
    return props.children;
  }

  return (
    <>
      <div className="u-center-text u-margin-bottom-large ">
        <h2 className="heading-primary u-margin-top-large">
          Foreign Dictionary
        </h2>
      </div>
      <div className={"row u-center-div "}>
        <div className={"col-1-of-3 form-group form-group--empty"}>
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={handleUserName}
            className="form-field form-field--special"
          />
        </div>

        <div className={"col-1-of-3 form-group form-group--empty"}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            className="form-field form-field--special"
          />
        </div>

        <div className={"col-1-of-3"} style={{ textAlign: "end" }}>
          <button onClick={handleSignIn} className={"btn btn--add"}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};
