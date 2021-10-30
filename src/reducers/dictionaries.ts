import { Actions } from "./rootReducer";
import { Dictionaries, Dictionary } from "../types";

type Action = {
  type: "DictionaryAdded" | "DictionariesInitialized";
  payload: { dictionaries: Dictionaries; dictionary: Dictionary };
};

export const dictionaries = (state: Dictionaries = [], action: Action) => {
  switch (action.type) {
    case Actions.DictionaryAdded:
      return [...state, action.payload.dictionary];

    case Actions.DictionariesInitialized:
      return action.payload.dictionaries;

    default:
      return state;
  }
};
