import { CurrDictionary, Dictionaries } from "../../types";

type Props = {
  value: CurrDictionary;
  dictionaries: Dictionaries;
  onChange: React.Dispatch<React.SetStateAction<CurrDictionary>>;
};

export const DictionaryDropdown = (props: Props) => {
  const { value, dictionaries, onChange } = props;

  const handleEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dictionaryName = e.currentTarget.value;
    const dictionary = dictionaries.find((x) => x.name === dictionaryName);

    onChange(dictionary);
  };

  return (
    <>
      <div className="u-center-text u-margin-top-medium">
        <h2 className="heading-secondary">Select your created dictionary</h2>
      </div>
      <div className="u-center-text u-margin-bottom">
        <select onChange={handleEvent} value={value?.name}>
          {dictionaries.map((dictionary, index: number) => {
            return (
              <option
                key={index}
                value={dictionary.name}
                label={dictionary.name}
              />
            );
          })}
        </select>
      </div>
    </>
  );
};
