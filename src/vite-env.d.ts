/// <reference types="vite/client" />

interface Window {
  webkitSpeechRecognition: any;
}

declare class webkitSpeechRecognition implements SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start(): void;
  stop(): void;
}