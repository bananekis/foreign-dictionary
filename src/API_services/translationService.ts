export class TranslationService {
  translate = async (
    word: string | undefined,
    language: string | undefined
  ) => {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?q=${word}&target=${language}&format=text&key=AIzaSyCNV5GTqPSPE8uvmERCQ-2KNJKAK2bx3QE`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const body = await response.json();

    return body.data.translations[0].translatedText;
  };
}
