import { List } from "immutable";
import { SpeechService } from "../../API_services/speechService";
import { TranslationService } from "../../API_services/translationService";
import { Word } from "../../types";
import React from "react";

const translateService = new TranslationService();
const speechService = new SpeechService();

type Props = {
  language:
    | {
        name: string;
        code: string;
      }
    | undefined;
  words: List<Word>;
  onChange: (updatedWords: List<Word>) => void;
};

export const Words = (props: Props) => {
  const { language, words, onChange } = props;

  const onAdd = () => {
    const newWord = { value: "", translatedValue: "" };

    onChange(words.push(newWord));
  };

  const changeWord = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const changedWord = e.currentTarget.value;

    onChange(
      words.update(index, (p) => ({
        ...p,
        value: changedWord,
      }))
    );
  };

  const changeTranslatedWord = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const changedWord = e.currentTarget.value;

    onChange(
      words.update(index, (p) => ({
        ...p,
        translatedValue: changedWord,
      }))
    );
  };

  const deleteWord = (index: number) => {
    onChange(words.delete(index));
  };

  const translateText = async (index: number) => {
    const word = words.get(index);
    const translatedValue = await translateService.translate(
      word!.value,
      language!.code
    );

    onChange(
      words.update(index, (p) => ({
        ...p,
        translatedValue,
      }))
    );
  };

  const pronounceText = async (index: number) => {
    const word = words.get(index);
    await speechService.speech(word!.translatedValue, language!.code);
  };

  return (
    <>
      <div className="row">
        <div className="col-1-of-2">
          <button onClick={onAdd} className={"btn btn--add"}>
            Add a new word
          </button>
        </div>
      </div>

      <div className={"row"}>
        <div className="col-1-of-2">
          {words.map((word, index: number) => (
            <div
              key={index}
              className={"form-group form-group--delete u-margin-bottom"}
            >
              <span>
                <button
                  onClick={() => deleteWord(index)}
                  style={{ cursor: "pointer" }}
                >
                  X
                </button>
              </span>
              <input
                value={word.value}
                placeholder={"Your word"}
                onChange={(e) => changeWord(e, index)}
                className="form-field form-field--special"
              />
            </div>
          ))}
        </div>

        <div className="col-1-of-2">
          {words.map((word, index: number) => (
            <div
              key={index}
              className={
                "form-group form-group--voice form-group--translate u-margin-bottom"
              }
            >
              <span className={"one"}>
                <button
                  onClick={async () => await translateText(index)}
                  style={{ cursor: "pointer" }}
                >
                  translate
                </button>
              </span>
              <input
                value={word.translatedValue}
                placeholder={"Translated word"}
                onChange={(e) => changeTranslatedWord(e, index)}
                className="form-field form-field--special"
              />
              <span className={"two"}>
                <button
                  onClick={async () => await pronounceText(index)}
                  style={{ cursor: "pointer" }}
                >
                  hear a voice
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
