import { Actions } from "./rootReducer";

type Action = {
  type: "SignIn" | "SignOut" | "IsSignedInLoaded";
  payload: { isLoggedIn: boolean };
};

export const isLoggedIn = (state = false, action: Action) => {
  switch (action.type) {
    case Actions.IsSignedInLoaded:
      return action.payload.isLoggedIn;

    case Actions.SignIn:
      return true;

    case Actions.SignOut:
      return false;

    default:
      return state;
  }
};
