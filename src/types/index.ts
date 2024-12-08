export interface TextMetadata {
  name: string;
  type: string;
  author: string;
  year: string;
  genre: string;
  difficulty: string;
  language: 'en' | 'sv';
}

export interface TextData {
  id: number;
  text: string;
  metadata: TextMetadata;
}

export interface FileUploadData {
  text: string;
  metadata: TextMetadata;
}

export interface User {
  id: number;
  name: string;
  age: number;
  preferredLanguage: 'en' | 'sv';
  createdAt: string;
}

export interface ReadingResult {
  id: number;
  userId: number;
  textId: number;
  accuracy: number;
  answers: Record<number, string | number>;
  timestamp: string;
}

export interface LanguageOption {
  code: 'en' | 'sv';
  name: string;
  flag: string;
}