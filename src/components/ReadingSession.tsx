import React, { useState, useEffect } from 'react';
import { Mic, PlayCircle, StopCircle } from 'lucide-react';
import { startSpeechRecognition } from '../utils/speechRecognition';
import { calculateReadingAccuracy, generateQuestions } from '../utils/textProcessing';
import { TextData, Question } from '../types';

interface ReadingSessionProps {
  text: TextData;
  onComplete: (result: { textId: number; accuracy: number; answers: Record<number, string | number> }) => void;
}

const ReadingSession: React.FC<ReadingSessionProps> = ({ text, onComplete }) => {
  const [isReading, setIsReading] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [spokenText, setSpokenText] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  useEffect(() => {
    if (text) {
      setQuestions(generateQuestions(text.text));
      setSpokenText('');
      setAccuracy(null);
      setAnswers({});
    }
  }, [text]);

  const startReading = () => {
    setSpokenText('');
    setAccuracy(null);
    const recognitionInstance = startSpeechRecognition(
      (transcript) => {
        setSpokenText(transcript);
      },
      (error) => {
        console.error('Speech recognition error:', error);
      }
    );
    
    if (recognitionInstance) {
      recognitionInstance.start();
      setRecognition(recognitionInstance);
      setIsReading(true);
    }
  };

  const stopReading = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
      setIsReading(false);
      const newAccuracy = calculateReadingAccuracy(text.text, spokenText);
      setAccuracy(newAccuracy);
      onComplete({
        textId: text.id,
        accuracy: newAccuracy,
        answers
      });
    }
  };

  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const renderText = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{text.metadata.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {text.metadata.author && `by ${text.metadata.author}`}
              {text.metadata.year && ` (${text.metadata.year})`}
            </p>
          </div>
          <button
            onClick={isReading ? stopReading : startReading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isReading
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isReading ? (
              <>
                <StopCircle className="h-5 w-5" />
                Stop Reading
              </>
            ) : (
              <>
                <PlayCircle className="h-5 w-5" />
                Start Reading
              </>
            )}
          </button>
        </div>

        <div className="max-w-none">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="text-reading py-8">
              {renderText(text?.text || '')}
            </div>
          </div>
        </div>

        {isReading && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Mic className="h-4 w-4 animate-pulse text-green-500" />
            Listening...
          </div>
        )}

        {accuracy !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium">Reading Assessment</h3>
            <p className="text-sm text-gray-600">
              Reading Accuracy: {accuracy.toFixed(1)}%
            </p>
          </div>
        )}

        {accuracy !== null && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Comprehension Questions</h3>
            {questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <p>{q.question}</p>
                {q.type === 'open' ? (
                  <textarea
                    className="w-full p-3 border rounded-lg resize-vertical min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                  />
                ) : q.type === 'rating' ? (
                  <div className="flex gap-2">
                    {q.options?.map((option) => (
                      <button
                        key={option}
                        className={`p-2 rounded-lg transition-colors ${
                          answers[q.id] === option
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleAnswerChange(q.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingSession;