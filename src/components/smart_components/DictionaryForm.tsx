import { Dictionary, Language } from "../../types";
import { languages } from "../../languages";
import { useState } from "react";

type Props = {
  onAdd: (dictionary: Dictionary) => void;
};

export const DictionaryForm = (props: Props) => {
  const { onAdd } = props;

  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>(languages[0]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const addDictionary = () => {
    const dictionary = {
      name: name,
      language: language,
    };

    setName("");
    setLanguage(languages[0]);
    onAdd(dictionary);
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageCode = e.currentTarget.value;

    const changedLanguage = languages.find(
      (lang) => lang.code === languageCode
    );
    setLanguage(changedLanguage!);
  };

  return (
    <div className="u-margin-top-medium">
      <div className="row">
        <div className="col-1-of-2 form-group form-group--normal">
          <span>Name of Dictionary</span>
          <input
            type="text"
            value={name}
            name="dictionaryName"
            className="form-field form-field--normal"
            onChange={handleName}
          />
        </div>

        <div className="col-1-of-2 form-group form-group--normal custom-select">
          <span>Language</span>
          <select
            value={language.code}
            onChange={changeLanguage}
            style={{ borderRadius: "0 6px 6px 0" }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} label={lang.name} />
            ))}
          </select>
          <button
            disabled={name === ""}
            onClick={addDictionary}
            className={"btn btn--plus"}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
