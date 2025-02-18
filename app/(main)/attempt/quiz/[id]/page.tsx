"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, Brain } from "lucide-react";
import { saveAttempt } from "@/lib/indexedDB";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

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
    setIsAskingAI(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const currentQ = questions[currentQuestion];
    // Mock AI response - replace with actual Gemini API call
    setAiResponse("This is a mock AI explanation of the correct answer...");
    setIsAskingAI(false);
  };

  if (showScore) {
    return (
      <div className="min-h-screen pt-24">
        <Card className="max-w-2xl mx-auto bg-gray-800/50 border-gray-700 p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Quiz Complete!</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Attempted Questions
                </h3>
                <p className="text-2xl font-bold text-white">
                  {currentQuestion + 1}/{questions.length}
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Correct Answers
                </h3>
                <p className="text-2xl font-bold text-green-500">{score}</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Wrong Answers
                </h3>
                <p className="text-2xl font-bold text-red-500">
                  {currentQuestion + 1 - score}
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Avg. Time/Question
                </h3>
                <p className="text-2xl font-bold text-purple-500">
                  {Math.round(
                    timePerQuestion.reduce((a, b) => a + b, 0) /
                      (currentQuestion + 1)
                  )}
                  s
                </p>
              </div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                Time per Question
              </h3>
              <div className="h-[60px] w-full">
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => router.push("/attempt")}
            >
              Back to Quizzes
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center text-white mb-4">
            <span>
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-xl font-bold">{timer}s</span>
          </div>
          <Progress value={(timer / 30) * 100} className="h-2 bg-gray-700" />
        </div>
        <Card className="bg-gray-800/50 border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">
            {questions[currentQuestion]?.text}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                  selectedOption === null
                    ? "bg-gray-700/50 hover:bg-gray-700 text-white"
                    : selectedOption === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? "bg-green-600/20 border-green-500 text-green-500"
                      : "bg-red-600/20 border-red-500 text-red-500"
                    : "bg-gray-700/50 text-gray-400"
                } border ${
                  selectedOption !== null &&
                  index === questions[currentQuestion].correctAnswer
                    ? "border-green-500"
                    : "border-transparent"
                }`}
                disabled={selectedOption !== null}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedOption !== null &&
                    (index === questions[currentQuestion].correctAnswer ? (
                      <Check className="text-green-500" />
                    ) : selectedOption === index ? (
                      <X className="text-red-500" />
                    ) : null)}
                </div>
              </button>
            ))}
          </div>
        </Card>
        {aiResponse && (
          <Card className="bg-gray-800/50 border-gray-700 p-4 mb-6">
            <p className="text-white">{aiResponse}</p>
          </Card>
        )}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-600/20"
            onClick={endQuiz}
          >
            End Quiz
          </Button>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600/20"
            onClick={askAI}
            disabled={isAskingAI || selectedOption === null}
          >
            <Brain className="mr-2" size={16} />
            Ask AI
          </Button>
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            {currentQuestion === questions.length - 1
              ? "Finish"
              : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttemptQuiz;
