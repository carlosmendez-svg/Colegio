
import React, { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/gemini';
import { QuizQuestion } from '../types';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const loadQuiz = async () => {
    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    try {
      const q = await generateQuizQuestions();
      setQuestions(q);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === questions[currentIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isLoading) {
    return (
      <div id="quiz" className="p-8 max-w-4xl mx-auto text-center bg-white rounded-3xl shadow-xl border-4 border-yellow-400 my-12">
        <div className="animate-bounce text-6xl mb-4">🇻🇪</div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Preparando el Desafío Tricolor...</h3>
        <p className="text-gray-500">Estamos consultando con los sabios de la historia...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div id="quiz" className="p-12 max-w-4xl mx-auto text-center bg-white rounded-3xl shadow-2xl border-t-8 border-yellow-400 my-12 animate-in zoom-in duration-300">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-6">¡Desafío Completado! 🎓</h2>
        <div className="text-7xl font-black text-blue-600 mb-4">{score} / {questions.length}</div>
        <p className="text-xl text-gray-700 mb-8">
          {score === questions.length ? "¡Increíble! Eres un verdadero experto en Venezuela." : 
           score >= questions.length / 2 ? "¡Muy bien! Sabes mucho, pero siempre hay más por aprender." : 
           "¡Sigue estudiando! Venezuela tiene tesoros increíbles por descubrir."}
        </p>
        <button 
          onClick={loadQuiz}
          className="bg-yellow-400 text-yellow-900 px-10 py-4 rounded-full font-bold text-xl hover:bg-yellow-300 shadow-lg transform transition-transform active:scale-95"
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  return (
    <div id="quiz" className="p-8 max-w-4xl mx-auto my-12">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-b-8 border-blue-600">
        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100">
          <div 
            className="h-full bg-yellow-400 transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">Pregunta {currentIndex + 1} de {questions.length}</span>
            <span className="text-gray-400 font-bold">Puntos: {score}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={showFeedback}
                className={`p-5 rounded-2xl text-left font-semibold transition-all flex items-center gap-4 border-2 ${
                  showFeedback 
                    ? idx === currentQ.correctAnswerIndex 
                      ? `bg-green-50 border-green-500 text-green-800 ${selectedOption === idx ? 'animate-success-pop shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}` 
                      : idx === selectedOption 
                        ? 'bg-red-50 border-red-500 text-red-800' 
                        : 'bg-gray-50 border-gray-100 text-gray-400 opacity-50'
                    : 'bg-white border-blue-50 text-gray-700 hover:border-blue-400 hover:bg-blue-50 active:scale-[0.98]'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-transform duration-300 ${
                   showFeedback 
                    ? idx === currentQ.correctAnswerIndex ? 'bg-green-500 border-green-500 text-white scale-110' : 'bg-white border-gray-200'
                    : 'bg-blue-50 border-blue-200 text-blue-600'
                }`}>
                  {showFeedback && idx === currentQ.correctAnswerIndex ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  ) : String.fromCharCode(65 + idx)}
                </div>
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-8 animate-in slide-in-from-top duration-500">
              <div className={`p-6 rounded-2xl mb-6 ${selectedOption === currentQ.correctAnswerIndex ? 'bg-green-50 border-2 border-green-100' : 'bg-red-50 border-2 border-red-100'}`}>
                <p className="font-bold text-lg mb-2 flex items-center gap-2">
                  {selectedOption === currentQ.correctAnswerIndex ? '✅ ¡Muy bien!' : '❌ ¡Casi!'}
                </p>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{currentQ.explanation}</p>
              </div>
              <button 
                onClick={nextQuestion}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl transition-all"
              >
                {currentIndex === questions.length - 1 ? 'Ver Resultado Final' : 'Siguiente Pregunta'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;