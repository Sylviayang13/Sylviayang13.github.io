import { useState } from 'react';
import { useNavigate } from 'react-router';
import { poems } from '../data/poems';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

type QuizState = 'select' | 'inProgress' | 'completed';

export function Quiz() {
  const navigate = useNavigate();
  const [state, setState] = useState<QuizState>('select');
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const poem = poems.find(p => p.id === selectedPoemId);
  const quiz = poem?.quiz ?? [];
  const question = quiz[currentIndex];

  const startQuiz = (poemId: string) => {
    setSelectedPoemId(poemId);
    setState('inProgress');
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
  };

  const handleAnswer = (index: number) => {
    if (!question || answered) return;
    setSelectedOption(index);
    setAnswered(true);

    if (index === question.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (!poem) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= quiz.length) {
      setState('completed');
      return;
    }
    setCurrentIndex(nextIndex);
    setAnswered(false);
    setSelectedOption(null);
  };

  const resetQuiz = () => {
    setState('select');
    setSelectedPoemId(null);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
  };

  const availablePoems = poems.filter(p => p.quiz && p.quiz.length > 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl text-[#3d3229] mb-2">Quiz & Test</h1>
              <p className="text-[#8b7355]">Check your understanding with quick quizzes based on each poem.</p>
            </div>
            {state !== 'select' && (
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f5f1e8] px-4 py-3 text-sm text-[#3d3229] hover:bg-[#ebe4d5] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to list
              </button>
            )}
          </div>
        </motion.div>

        {state === 'select' && (
          <div className="grid md:grid-cols-2 gap-8">
            {availablePoems.map(poem => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/90 rounded-3xl p-8 border border-[#d4c5a9]/20 shadow-lg"
              >
                <h2 className="font-serif text-2xl text-[#3d3229] mb-2">{poem.title}</h2>
                <p className="text-[#8b7355] mb-6">{poem.simpleExplanation}</p>
                <button
                  onClick={() => startQuiz(poem.id)}
                  className="rounded-xl bg-[#8b7355] px-6 py-3 text-sm font-medium text-white hover:bg-[#6b5745] transition-all"
                >
                  Start Quiz
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {state === 'inProgress' && poem && question && (
          <div className="bg-white/90 rounded-3xl p-10 border border-[#d4c5a9]/20 shadow-lg">
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-[#3d3229] mb-1">{poem.title} Quiz</h2>
              <p className="text-sm text-[#8b7355]">Question {currentIndex + 1} of {quiz.length}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-medium text-[#3d3229]">{question.question}</p>
            </div>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isCorrect = idx === question.answerIndex;
                const isSelected = selectedOption === idx;
                const correctStyle = isCorrect ? 'bg-emerald-100 border-emerald-300' : '';
                const selectedStyle = isSelected ? 'border-[#8b7355] bg-[#f5f1e8]' : 'bg-white';

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${selectedStyle} ${answered && correctStyle}`}
                    disabled={answered}
                  >
                    <span className="text-sm text-[#3d3229]">{option}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="mt-6 rounded-xl bg-[#f5f1e8] p-4 text-sm text-[#3d3229]">
                <p className="font-medium">
                  {selectedOption === question.answerIndex ? 'Correct!' : 'Not quite.'}
                </p>
                <p className="mt-2">{question.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-[#8b7355]">
                Score: {score} / {quiz.length}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/poem/${poem.id}`)}
                  className="rounded-xl bg-[#f5f1e8] px-4 py-2 text-sm text-[#3d3229] hover:bg-[#ebe4d5] transition-all"
                >
                  Review Poem
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={!answered}
                  className="rounded-xl bg-[#8b7355] px-4 py-2 text-sm text-white hover:bg-[#6b5745] transition-all disabled:opacity-50"
                >
                  {currentIndex + 1 >= quiz.length ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}

        {state === 'completed' && poem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 rounded-3xl p-10 border border-[#d4c5a9]/20 shadow-lg"
          >
            <h2 className="font-serif text-3xl text-[#3d3229] mb-3">Quiz Complete</h2>
            <p className="text-[#8b7355] mb-6">You scored {score} out of {quiz.length}.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => startQuiz(poem.id)}
                className="rounded-xl bg-[#8b7355] px-6 py-3 text-sm font-medium text-white hover:bg-[#6b5745] transition-all"
              >
                Retry
              </button>
              <button
                onClick={() => navigate(`/poem/${poem.id}`)}
                className="rounded-xl bg-[#f5f1e8] px-6 py-3 text-sm font-medium text-[#3d3229] hover:bg-[#ebe4d5] transition-all"
              >
                Review Poem
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
