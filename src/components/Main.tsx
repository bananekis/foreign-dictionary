import { Actions, RootState } from "../reducers/rootReducer";
import { CurrDictionary, Dictionaries, Dictionary, Word } from "../types";
import { DictionaryDropdown } from "./views/DictionaryDropdown";
import { DictionaryForm } from "./smart_components/DictionaryForm";
import { List, Map } from "immutable/dist/immutable";
import { Words } from "./views/Words";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

type Props = {
  onLogout: () => void;
};

const dictionariesState = (state: RootState) => state.dictionaries;

export const Main = (props: Props) => {
  const [currentDictionary, setCurrentDictionary] =
    useState<CurrDictionary>(undefined);
  const [wordsByDictionaries, setWordsByDictionaries] = useState<
    Map<string, Word[]>
  >(Map());

  const dispatch = useDispatch();
  const dictionaries = useSelector(dictionariesState);

  const { onLogout } = props;

  // get all dictionaries, set CURRENT dictionary, set words in dictionary

  useEffect(() => {
    const rawDictionaries = window.localStorage.getItem("dictionaries");
    const loadedDictionaries: Dictionaries = rawDictionaries
      ? JSON.parse(rawDictionaries)
      : [];

    dispatch({
      type: Actions.DictionariesInitialized,
      payload: { dictionaries: loadedDictionaries },
    });

    const selectedDictionaryName =
      window.localStorage.getItem("selectedDictionary");
    const selectedDictionary = loadedDictionaries.find(
      (x) => x.name === selectedDictionaryName
    );

    setCurrentDictionary(selectedDictionary);

    let mapOfDictionaries: Map<string, Word[]> = Map();

    loadedDictionaries.forEach((dictionary) => {
      const localWords = JSON.parse(
        window.localStorage.getItem("dictionary_" + dictionary.name) || "[]"
      );

      mapOfDictionaries = mapOfDictionaries.set(dictionary.name, localWords);
    });

    setWordsByDictionaries(mapOfDictionaries);
  }, []);

  useEffect(() => {
    if (!currentDictionary && dictionaries.length > 0) {
      setCurrentDictionary(dictionaries[0]);
    }

    window.localStorage.setItem("dictionaries", JSON.stringify(dictionaries));
  }, [dictionaries]);

  useEffect(() => {
    if (!currentDictionary) {
      return;
    }

    window.localStorage.setItem("selectedDictionary", currentDictionary.name);
  }, [currentDictionary]);

  useEffect(() => {
    if (!currentDictionary) {
      return;
    }
    const rawWords = JSON.stringify(
      wordsByDictionaries.get(currentDictionary.name)
    );
    window.localStorage.setItem(
      "dictionary_" + currentDictionary.name,
      rawWords
    );
  }, [wordsByDictionaries]);

  const words: List<Word> = List(
    (currentDictionary && wordsByDictionaries.get(currentDictionary.name)) ??
      List()
  );

  const onWordsChange = (updatedWords: List<Word>) => {
    setWordsByDictionaries((p) => {
      return p.set(currentDictionary!.name, updatedWords.toArray());
    });
  };

  const addDictionary = (dictionary: Dictionary) => {
    if (dictionaries.find((x) => x.name === dictionary.name)) {
      return;
    }

    dispatch({
      type: Actions.DictionaryAdded,
      payload: { dictionary },
    });
  };

  return (
    <>
      <button onClick={onLogout} className={"btn btn--signOut"}>
        Sign out
      </button>

      <div className="u-center-text u-margin-bottom-large">
        <h2 className="heading-primary">Foreign Dictionary</h2>
      </div>

      <DictionaryForm onAdd={addDictionary} />

      <DictionaryDropdown
        value={currentDictionary}
        dictionaries={dictionaries}
        onChange={setCurrentDictionary}
      />

      <Words
        language={currentDictionary?.language}
        words={words}
        onChange={onWordsChange}
      />
    </>
  );
};
