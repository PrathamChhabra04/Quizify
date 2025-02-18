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
import { Award, Clock, User, Brain } from "lucide-react";
import { initDB, getAttempts } from "@/lib/indexedDB";
import { useRouter } from "next/navigation";

interface Quiz {
  id: string;
  title: string;
  createdBy: string;
  totalQuestions: number;
  attempts?: number;
  maxScore?: number;
}

const QuizList = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    // Initialize IndexedDB
    initDB().then(() => {
      // Mock quiz data - replace with your actual data source
      const mockQuizzes = [
        {
          id: "1",
          title: "Quiz 1",
          createdBy: "John Doe",
          totalQuestions: 10,
        },
        {
          id: "2",
          title: "Quiz 2",
          createdBy: "Jane Smith",
          totalQuestions: 15,
        },
        {
          id: "3",
          title: "Quiz 3",
          createdBy: "James Pardon",
          totalQuestions: 10,
        },
      ];

      // Get attempts for each quiz
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

  return (
    <div className="min-h-screen w-full pt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl gradient-title mb-8 mt-4 text-center">
          Available Quizzes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-white">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300 space-x-2">
                    <User size={16} />
                    <span>Created by {quiz.createdBy}</span>
                  </div>
                  <div className="flex items-center text-gray-300 space-x-2">
                    <Brain size={16} />
                    <span>{quiz.totalQuestions} Questions</span>
                  </div>
                  {quiz.attempts !== undefined && (
                    <div className="flex items-center text-gray-300 space-x-2">
                      <Clock size={16} />
                      <span>{quiz.attempts} Attempts</span>
                    </div>
                  )}
                  {quiz.maxScore !== undefined && (
                    <div className="flex items-center text-gray-300 space-x-2">
                      <Award size={16} />
                      <span>Best Score: {quiz.maxScore}%</span>
                    </div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => setSelectedQuiz(quiz)}
                      >
                        {quiz.attempts ? "Take Quiz Again" : "Take Quiz"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-white border-gray-700">
                      <DialogHeader>
                        <DialogTitle>Quiz Instructions</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>Welcome to {quiz.title}!</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>You will have 30 seconds per question</li>
                          <li>Timer starts automatically for each question</li>
                          <li>
                            You can use the &quot;Ask AI&quot; feature for help
                          </li>
                          <li>Your score and attempts will be saved</li>
                        </ul>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() =>
                            router.push(`/attempt/quiz/${quiz.id}`)
                          }
                        >
                          Proceed to Quiz
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
