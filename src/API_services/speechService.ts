export class SpeechService {
  speech = async (word: string | undefined, language: string | undefined) => {
    const response = await fetch(
      "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyAexbAa5B0tvlfeYGs3aI2tr0O6WuXI1zA",
      {
        method: "POST",
        body: JSON.stringify({
          input: {
            text: word,
          },
          voice: {
            languageCode: language,
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
        }),
      }
    );

    const data = await response.json();
    const pronouncedWordBytes = atob(data.audioContent);

    const context = new AudioContext();

    var len = pronouncedWordBytes.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = pronouncedWordBytes.charCodeAt(i);
    }

    context.decodeAudioData(bytes.buffer, function (buffer: AudioBuffer) {
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = buffer; // tell the source which sound to play
      source.connect(context.destination); // connect the source to the context's destination (the speakers)
      source.start(0);
    });
  };
}
