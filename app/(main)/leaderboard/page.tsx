"use client";
import { useEffect, useState } from "react";
import { getAttempts } from "@/lib/indexedDB";
import { Card } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttemptData {
  id?: number;
  quizId: string;
  quizTitle: string;
  userName: string;
  score: number;
  attemptedQuestions: number;
  totalQuestions: number;
  timePerQuestion: number[];
  date: string;
}

const Leaderboard = () => {
  const [attempts, setAttempts] = useState<AttemptData[]>([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const allAttempts = await getAttempts();
      // Sort by score in descending order
      setAttempts(allAttempts.sort((a, b) => b.score - a.score));
    };
    fetchAttempts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-6xl gradient-title">Leaderboard</h1>
          <Trophy className="text-yellow-500 w-8 h-8" />
        </div>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Rank</TableHead>
                <TableHead className="text-gray-300">Quiz</TableHead>
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Score
                </TableHead>
                <TableHead className="text-gray-300 text-right">
                  Questions
                </TableHead>
                <TableHead className="text-gray-300 text-right">
                  Avg. Time
                </TableHead>
                <TableHead className="text-gray-300 text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map((attempt, index) => (
                <TableRow key={attempt.id} className="border-gray-700">
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-2">
                      {index < 3 && (
                        <Medal
                          className={`w-4 h-4 ${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                              ? "text-gray-400"
                              : "text-orange-700"
                          }`}
                        />
                      )}
                      #{index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {attempt.quizTitle}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {attempt.userName}
                  </TableCell>
                  <TableCell className="text-right font-bold text-purple-400">
                    {attempt.score.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {attempt.attemptedQuestions}/{attempt.totalQuestions}
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {Math.round(
                      attempt.timePerQuestion.reduce((a, b) => a + b, 0) /
                        attempt.attemptedQuestions
                    )}
                    s
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {new Date(attempt.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
