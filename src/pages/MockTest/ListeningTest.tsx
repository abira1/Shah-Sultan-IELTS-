import React, { useEffect, useState } from 'react';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';

interface ListeningProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  type: 'multiple-choice' | 'fill-blank';
}

const Listening: React.FC<ListeningProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes for demo
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Sample questions based on the British Council format
  const questions: Question[] = [
    {
      id: 1,
      text: "Why did Judy choose to study the East End of London?",
      options: [
        "She wanted to understand her own background.",
        "She was interested in place names.",
        "She had read several books about it."
      ],
      type: 'multiple-choice'
    },
    {
      id: 2,
      text: "What was Judy's main source of materials?",
      options: [
        "books",
        "newspapers",
        "interviews"
      ],
      type: 'multiple-choice'
    },
    {
      id: 3,
      text: "What difficulty did Judy have with her dissertation?",
      options: [
        "writing the first draft",
        "organising what she had collected",
        "finding enough relevant sources"
      ],
      type: 'multiple-choice'
    }
  ];

  const questionsPerPage = 3;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  // Handle answer change
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Get questions for current page
  const getCurrentPageQuestions = () => {
    const startIndex = (currentQuestionPage - 1) * questionsPerPage;
    return questions.slice(startIndex, startIndex + questionsPerPage);
  };

  const goToNextPage = () => {
    if (currentQuestionPage < totalPages) {
      setCurrentQuestionPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentQuestionPage > 1) {
      setCurrentQuestionPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with timer */}
      <div className="bg-white border-b-2 border-gray-200 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
              <div className="w-8 h-8 bg-green-600 rounded-sm"></div>
              <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">IELTS™ Listening Test</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-50 px-3 py-2 rounded border">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              <span className={`text-lg font-mono font-bold ${
                timeLeft <= 60 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {/* Test section header */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">IELTS Listening</h2>
            <div className="text-sm text-gray-600">
              <div>Multiple Choice Questions</div>
              <div>Questions {Math.min((currentQuestionPage - 1) * questionsPerPage + 1, questions.length)} – {Math.min(currentQuestionPage * questionsPerPage, questions.length)} of {questions.length}</div>
              <div className="text-blue-600 mt-1">Choose the correct answer for each question.</div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-8 mb-8">
            {getCurrentPageQuestions().map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-gray-100 border border-gray-300 rounded w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1 text-gray-700">
                    {question.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base text-gray-900 mb-4 leading-relaxed font-medium">
                      {question.text}
                    </h3>
                    
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label 
                          key={optionIndex}
                          className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 mt-1 mr-3"
                          />
                          <span className="text-gray-700 leading-relaxed">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <button
                onClick={goToPrevPage}
                disabled={currentQuestionPage === 1}
                className={`flex items-center px-4 py-2 border rounded transition-colors ${
                  currentQuestionPage === 1 
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600 font-medium">
                  Page {currentQuestionPage} of {totalPages}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Object.keys(answers).length} of {questions.length} questions answered
                </div>
              </div>

              {currentQuestionPage < totalPages ? (
                <button
                  onClick={goToNextPage}
                  className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={onComplete}
                  className="flex items-center px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded transition-colors font-medium"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <div className="text-xs text-gray-500">
              Test Progress: {Math.round((Object.keys(answers).length / questions.length) * 100)}% • Time Remaining: {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listening;