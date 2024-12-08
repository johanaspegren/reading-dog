import mammoth from 'mammoth';
import { TextMetadata } from '../types';

export const processFile = async (file: File): Promise<string> => {
  try {
    let text: string;
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value;
    } else if (file.type === "text/plain") {
      text = await file.text();
    } else {
      throw new Error("Unsupported file type");
    }

    // Normalize whitespace while preserving paragraph breaks
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+/g, ' ')
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .trim();
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error(`Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const extractMetadata = (fileName: string): Omit<TextMetadata, 'type'> => {
  const pattern = /^(?:([^-]+)\s*-\s*)?([^(\[]+)(?:\s*\((\d{4})\))?(?:\s*\[([^\]]+)\])?/;
  const match = fileName.replace(/\.(docx|txt)$/, '').match(pattern);

  return {
    name: (match?.[2] || fileName).trim(),
    author: (match?.[1] || "").trim(),
    year: (match?.[3] || "").trim(),
    genre: (match?.[4] || "").trim(),
    difficulty: "medium"
  };
};