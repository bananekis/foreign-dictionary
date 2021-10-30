import { Dictionaries } from "../types";
import { combineReducers } from "redux";
import { dictionaries } from "./dictionaries";
import { isLoggedIn } from "./isLoggedIn";

export const Actions = {
  DictionaryAdded: "DictionaryAdded",
  DictionariesInitialized: "DictionariesInitialized",
  IsSignedInLoaded: "IsSignedInLoaded",
  SignIn: "SignIn",
  SignOut: "SignOut",
};

export type RootState = {
  isLoggedIn: boolean;
  dictionaries: Dictionaries;
};

export const rootReducer = combineReducers({
  isLoggedIn,
  dictionaries,
});
