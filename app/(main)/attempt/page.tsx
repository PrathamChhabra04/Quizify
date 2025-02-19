"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award, Clock, User, Brain, Star, Zap } from "lucide-react";
import { initDB, getAttempts } from "@/lib/indexedDB";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Quiz {
  id: string;
  title: string;
  createdBy: string;
  totalQuestions: number;
  attempts?: number;
  maxScore?: number;
  difficulty?: "easy" | "medium" | "hard";
}

const QuizList = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    initDB().then(() => {
      const mockQuizzes = [
        {
          id: "1",
          title: "Space Exploration",
          createdBy: "Cosmic Academy",
          totalQuestions: 10,
          // eslint-disable-next-line @typescript-eslint/prefer-as-const
          difficulty: "medium" as "medium",
        },
        {
          id: "2",
          title: "Computer Science Basics",
          createdBy: "Tech Institute",
          totalQuestions: 15,
          // eslint-disable-next-line @typescript-eslint/prefer-as-const
          difficulty: "easy" as "easy",
        },
        {
          id: "3",
          title: "Advanced Chemistry",
          createdBy: "Science Lab",
          totalQuestions: 12,
          // eslint-disable-next-line @typescript-eslint/prefer-as-const
          difficulty: "hard" as "hard",
        },
      ];

      Promise.all(
        mockQuizzes.map(async (quiz) => {
          const attempts = await getAttempts(quiz.id);
          return {
            ...quiz,
            attempts: attempts.length,
            maxScore:
              attempts.length > 0
                ? Math.max(...attempts.map((a) => a.score))
                : undefined,
          };
        })
      ).then(setQuizzes);
    });
  }, []);

  const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const colors = {
      easy: "from-green-500 to-emerald-600",
      medium: "from-yellow-500 to-amber-600",
      hard: "from-red-500 to-rose-600",
    };

    return (
      <span
        className={cn(
          "text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r",
          colors[difficulty as keyof typeof colors]
        )}
      >
        {difficulty.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen w-full pt-20 bg-gradient-to-b from-gray-900 to-gray-950 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-12 text-center font-bold"
        >
          Discover Quizzes
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="flex flex-row justify-between items-start">
                  <CardTitle className="text-white text-xl font-semibold">
                    {quiz.title}
                  </CardTitle>
                  {quiz.difficulty && (
                    <DifficultyBadge difficulty={quiz.difficulty} />
                  )}
                </CardHeader>

                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="p-2 bg-gray-700/50 rounded-full">
                        <User size={18} className="text-purple-400" />
                      </div>
                      <span className="text-sm">{quiz.createdBy}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="p-2 bg-gray-700/50 rounded-full">
                          <Brain size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Questions</p>
                          <p className="text-sm font-medium">
                            {quiz.totalQuestions}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="p-2 bg-gray-700/50 rounded-full">
                          <Clock size={18} className="text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Attempts</p>
                          <p className="text-sm font-medium">
                            {quiz.attempts || 0}
                          </p>
                        </div>
                      </div>

                      {quiz.maxScore !== undefined && (
                        <div className="col-span-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-700/50 rounded-full">
                              <Award size={18} className="text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>Best Score</span>
                                <span>{quiz.maxScore}%</span>
                              </div>
                              <div className="h-2 bg-gray-700/50 rounded-full mt-1">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                                  style={{ width: `${quiz.maxScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/20 transition-all"
                          onClick={() => {
                            console.log("Clicked");
                            setSelectedQuiz(quiz);
                          }}
                        >
                          <Zap size={16} className="mr-2" />
                          {quiz.attempts ? "Retake Quiz" : "Start Challenge"}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="bg-gray-800 border-gray-700/50 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Ready for {quiz.title}?
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                          <div className="flex items-center gap-3 text-purple-300">
                            <Star size={18} className="shrink-0" />
                            <p className="text-sm">
                              Test your knowledge with {quiz.totalQuestions}{" "}
                              questions
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-blue-300">
                            <Clock size={18} className="shrink-0" />
                            <p className="text-sm">30 seconds per question</p>
                          </div>

                          <div className="flex items-center gap-3 text-emerald-300">
                            <Brain size={18} className="shrink-0" />
                            <p className="text-sm">
                              AI-powered explanations available
                            </p>
                          </div>

                          <div className="mt-6">
                            <Button
                              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
                              onClick={() =>
                                router.push(`/attempt/quiz/${quiz.id}`)
                              }
                            >
                              Begin Challenge →
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
