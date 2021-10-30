import "./sass/main.scss";
import { Actions } from "./reducers/rootReducer";
import { LoginForm } from "./components/smart_components/LoginForm";
import { Main } from "./components/Main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const defaultUser = {
  name: "admin",
  password: "admin",
};

export const App = () => {
  const isLoggedIn = useSelector(
    (state: { isLoggedIn: boolean }) => state.isLoggedIn
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const value = JSON.parse(window.localStorage.getItem("isLoggedIn") || "{}");
    dispatch({
      type: Actions.IsSignedInLoaded,
      payload: { isLoggedIn: value },
    });
  }, []);

  const onLogin = () => {
    dispatch({ type: Actions.SignIn });
    window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const onLogout = () => {
    dispatch({ type: Actions.SignOut });
    window.localStorage.setItem("isLoggedIn", JSON.stringify(false));
  };

  return (
    <LoginForm
      onLogin={onLogin}
      isLoggedIn={isLoggedIn}
      defaultUser={defaultUser}
    >
      <Main onLogout={onLogout} />
    </LoginForm>
  );
};
