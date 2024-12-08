import React from 'react';
import { Book, Trash2 } from 'lucide-react';
import { TextData } from '../types';

interface TextListProps {
  texts: TextData[];
  onSelect: (text: TextData) => void;
  onDelete: (id: number) => void;
  selectedId: number | null;
}

const TextList: React.FC<TextListProps> = ({ texts, onSelect, onDelete, selectedId }) => {
  return (
    <div className="space-y-4">
      {texts.length === 0 ? (
        <p className="text-center text-gray-500">No reading materials yet</p>
      ) : (
        texts.map((text) => (
          <div
            key={text.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedId === text.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-gray-500" />
              <div className="flex-grow" onClick={() => onSelect(text)}>
                <h3 className="font-medium">{text.metadata.name}</h3>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span>{text.metadata.author}</span>
                  {text.metadata.author && text.metadata.genre && <span>•</span>}
                  <span>{text.metadata.genre}</span>
                  {(text.metadata.author || text.metadata.genre) && <span>•</span>}
                  <span>Difficulty: {text.metadata.difficulty}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(text.id);
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete text"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TextList;