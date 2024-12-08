export const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
  language: 'en' | 'sv'
): SpeechRecognition | null => {
  if (!('webkitSpeechRecognition' in window)) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = language === 'en' ? 'en-US' : 'sv-SE';

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    onError(event.error);
  };

  return recognition;
};