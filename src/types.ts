export type Dictionaries =
  | {
      name: string;
      language: Language;
    }[];

export type Dictionary = {
  name: string;
  language: Language;
};

export type CurrDictionary = Dictionary | undefined;

export type Language = {
  name: string;
  code: string;
};

export type Word = {
  value?: string;
  translatedValue?: string;
};
