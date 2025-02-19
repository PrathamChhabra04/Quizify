"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Brain, Loader2, Clock, Zap } from "lucide-react";
import { saveAttempt } from "@/lib/indexedDB";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { getAIExplanation } from "@/actions/explain";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => {
  const colors = {
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
  };

  return (
    <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600/50">
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-sm font-medium text-${color}-400`}>{title}</div>
          <div className="text-2xl font-bold text-gray-100">{value}</div>
        </div>
        <div
          className={`p-2 rounded-lg bg-gradient-to-br ${
            colors[color as keyof typeof colors]
          } text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const AttemptQuiz = () => {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timer, setTimer] = useState(30);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    // Sample quiz data
    setQuestions([
      {
        id: "1",
        text: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: 1,
      },
      {
        id: "2",
        text: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correctAnswer: 1,
      },
      {
        id: "3",
        text: "Which of the following is primarily used for structuring web pages?",
        options: ["Python", "Java", "HTML", "C++"],
        correctAnswer: 2,
      },
      {
        id: "4",
        text: "Which chemical symbol stands for Gold?",
        options: ["Au", "Gd", "Ag", "Pt"],
        correctAnswer: 0,
      },
      {
        id: "5",
        text: "Which of these processes is not typically involved in refining petroleum?",
        options: [
          "Fractional distillation",
          "Cracking",
          "Polymerization",
          "Filtration",
        ],
        correctAnswer: 3,
      },
      {
        id: "6",
        text: "What is the value of 12 + 28?",
        options: ["38", "40", "42", "44"],
        correctAnswer: 1,
      },
      {
        id: "7",
        text: "How many states are there in the United States?",
        options: ["48", "49", "50", "51"],
        correctAnswer: 2,
      },
      {
        id: "8",
        text: "In which year was the Declaration of Independence signed?",
        options: ["1774", "1775", "1776", "1777"],
        correctAnswer: 2,
      },
      {
        id: "9",
        text: "What is the value of pi rounded to the nearest integer?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
      },
      {
        id: "10",
        text: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
        options: ["100", "110", "120", "130"],
        correctAnswer: 2,
      },
    ]);
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && selectedOption === null && !showScore) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && selectedOption === null && !showScore) {
      // Auto-progress when timer hits 0
      handleNextQuestion();
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, selectedOption, showScore]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
    }
    setTimePerQuestion((prev) => [...prev, 30 - timer]);
  };

  const handleNextQuestion = () => {
    setTimePerQuestion((prev) => [...prev, 30 - timer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelectedOption(null);
      setTimer(30);
      setAiResponse("");
    } else {
      endQuiz();
    }
  };

  const endQuiz = async () => {
    setShowScore(true);
    const attemptData = {
      quizId: id!,
      quizTitle: "Sample Quiz",
      userName: "User",
      score: (score / questions.length) * 100, // Calculate percentage based on total questions
      attemptedQuestions: currentQuestion + 1,
      totalQuestions: questions.length,
      timePerQuestion,
      date: new Date().toISOString(),
    };
    await saveAttempt(attemptData);
  };

  const askAI = async () => {
    try {
      setIsAskingAI(true);
      const currentQ = questions[currentQuestion];
      const correctAnswer = currentQ.options[currentQ.correctAnswer];
      const explanation = await getAIExplanation(currentQ.text, correctAnswer);
      // Mock AI response - replace with actual Gemini API call
      setAiResponse(explanation);
    } catch (error) {
      setAiResponse("Error fetching explanation. Please try again." + error);
    } finally {
      setIsAskingAI(false);
    }
  };

  if (showScore) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-b from-gray-900 to-gray-950 pb-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm p-8 shadow-2xl shadow-purple-500/10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Quiz Mastered!
              </h2>
              <p className="text-gray-400 mt-2">Your performance breakdown</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard
                title="Completed"
                value={`${currentQuestion + 1}/${questions.length}`}
                icon={<Check className="w-5 h-5" />}
                color="purple"
              />
              <StatCard
                title="Accuracy"
                value={`${Math.round((score / (currentQuestion + 1)) * 100)}%`}
                icon={<Brain className="w-5 h-5" />}
                color="blue"
              />
              <StatCard
                title="Correct"
                value={score.toString()}
                icon={<Check className="w-5 h-5" />}
                color="green"
              />
              <StatCard
                title="Time/Question"
                value={`${Math.round(
                  timePerQuestion.reduce((a, b) => a + b, 0) /
                    (currentQuestion + 1)
                )}s`}
                icon={<Clock className="w-5 h-5" />}
                color="yellow"
              />
            </div>

            <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600/50 mb-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Performance Timeline
              </h3>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timePerQuestion.map((time, index) => ({
                      time,
                      question: index + 1,
                    }))}
                  >
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#9333ea"
                      strokeWidth={2}
                      dot={false}
                      strokeLinecap="round"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg shadow-lg hover:shadow-purple-500/20 transition-all"
              onClick={() => router.push("/attempt")}
            >
              Explore More Quizzes
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-3xl mx-auto px-4">
        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-gray-300 mb-3">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold">{timer}s</span>
            </div>
          </div>
          <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: `${(timer / 30) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-6">
              {questions[currentQuestion]?.text}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, index) => {
                const isCorrect =
                  index === questions[currentQuestion].correctAnswer;
                const isSelected = selectedOption === index;
                const showCorrect = selectedOption !== null && isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                    className={cn(
                      "w-full p-4 rounded-xl text-left transition-all flex items-center justify-between",
                      "border-2 hover:border-purple-400/30",
                      selectedOption === null
                        ? "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700/70"
                        : isSelected
                        ? isCorrect
                          ? "bg-green-500/10 border-green-400/50"
                          : "bg-red-500/10 border-red-400/50"
                        : showCorrect
                        ? "bg-green-500/10 border-green-400/50"
                        : "bg-gray-700/50 border-gray-600/50"
                    )}
                  >
                    <span className="text-gray-100">{option}</span>
                    {selectedOption !== null && (
                      <AnimatePresence>
                        {isSelected ? (
                          isCorrect ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-400"
                            >
                              <Check className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-red-400"
                            >
                              <X className="w-5 h-5" />
                            </motion.div>
                          )
                        ) : showCorrect ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : null}
                      </AnimatePresence>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* AI Explanation */}
        <AnimatePresence>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <Card className="bg-gray-800/30 border border-purple-500/20 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {aiResponse}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 border-gray-600/50 text-gray-300 hover:bg-gray-700/30 hover:border-purple-400/30"
            onClick={endQuiz}
          >
            End Quiz
          </Button>

          <Button
            className="border-gray-600/50 text-gray-800 hover:bg-gray-700/30 hover:border-purple-400/30 hover:text-gray-300"
            onClick={askAI}
            disabled={isAskingAI || selectedOption === null}
          >
            {isAskingAI ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
          </Button>

          <Button
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttemptQuiz;
