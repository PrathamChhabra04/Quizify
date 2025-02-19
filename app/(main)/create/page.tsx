"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Plus, X, CheckSquare, Hash, Zap, Save } from "lucide-react"; // Added icons
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

type QuizType = "mcq" | "integer";

interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface IntegerQuestion {
  question: string;
  correctAnswer: number;
}

const CreateQuiz = () => {
  // Quiz configuration state
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [timePerQuestion, setTimePerQuestion] = useState<number>(30);
  const [quizTitle, setQuizTitle] = useState("");

  // Question creation state
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [newOption, setNewOption] = useState("");
  const [questions, setQuestions] = useState<(MCQQuestion | IntegerQuestion)[]>(
    []
  );

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  const handleAddQuestion = () => {
    if (!currentQuestion) return;

    const newQuestion =
      quizType === "mcq"
        ? {
            question: currentQuestion,
            options: [...options],
            correctAnswer: correctAnswer,
          }
        : {
            question: currentQuestion,
            correctAnswer: Number(correctAnswer),
          };

    setQuestions([...questions, newQuestion]);
    resetQuestionForm();
  };

  const resetQuestionForm = () => {
    setCurrentQuestion("");
    setOptions([]);
    setCorrectAnswer("");
    setShowQuestionForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6 sm:p-8 backdrop-blur-sm"
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Create New Quiz
            </h1>
            <p className="mt-2 text-gray-400">
              Craft your perfect quiz with AI-friendly options
            </p>
          </header>

          {/* Quiz Metadata Section */}
          <section className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Quiz Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="quizTitle"
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="max-w-md bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Quiz Type Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-4">
                Quiz Type <span className="text-red-500">*</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  variant={quizType === "mcq" ? "default" : "outline"}
                  className={`h-24 flex flex-col gap-2 transition-all ${
                    quizType === "mcq"
                      ? "bg-purple-600/30 border-purple-500 hover:bg-purple-600/40"
                      : "border-gray-600 hover:border-purple-400"
                  }`}
                  onClick={() => setQuizType("mcq")}
                >
                  <CheckSquare className="h-6 w-6 text-purple-400" />
                  <span className="text-gray-100">Multiple Choice</span>
                  <span className="text-xs text-gray-400">
                    Select from options
                  </span>
                </Button>

                <Button
                  variant={quizType === "integer" ? "default" : "outline"}
                  className={`h-24 flex flex-col gap-2 transition-all ${
                    quizType === "integer"
                      ? "bg-blue-600/30 border-blue-500 hover:bg-blue-600/40"
                      : "border-gray-600 hover:border-blue-400"
                  }`}
                  onClick={() => setQuizType("integer")}
                >
                  <Hash className="h-6 w-6 text-blue-400" />
                  <span className="text-gray-100">Numeric Answer</span>
                  <span className="text-xs text-gray-400">
                    Exact number input
                  </span>
                </Button>
              </div>
            </div>

            {/* Quiz Settings */}
            <div className="bg-gray-700/30 p-4 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-300 mb-4">
                Quiz Configuration
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={timePerQuestion}
                      onChange={(e) =>
                        setTimePerQuestion(Number(e.target.value))
                      }
                      className="w-20 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded-md text-white focus:ring-2 focus:ring-purple-500"
                      min="5"
                      max="300"
                    />
                    <span className="text-gray-400">seconds per question</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-600/30 px-4 py-2 rounded-md">
                  <span className="text-gray-400">Questions Added:</span>
                  <span className="font-semibold text-purple-400">
                    {questions.length}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Question Creation Section */}
          <section className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">
                  Question Bank
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {questions.length} questions configured
                </p>
              </div>
              <Button
                size="lg"
                className="bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500 text-purple-100"
                disabled={!quizType || !quizTitle.trim()}
                onClick={() => setShowQuestionForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="mt-6 space-y-3">
                {questions.map((q, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-100">
                          Q{index + 1}: {q.question}
                        </p>
                        {"options" in q && (
                          <div className="mt-1.5 flex flex-wrap gap-2">
                            {q.options.map((option, i) => (
                              <span
                                key={i}
                                className={`px-2 py-1 text-xs rounded-md ${
                                  option === q.correctAnswer
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-gray-600/50 text-gray-400"
                                }`}
                              >
                                {option}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Question Form */}
            {showQuestionForm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-300 mb-6">
                  Craft New Question
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Question Text <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Enter your question"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {quizType === "mcq" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={option}
                              readOnly
                              className="bg-gray-700/30 border-gray-600 text-gray-300"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveOption(index)}
                              className="text-red-400 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add new option"
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                          className="bg-gray-700/30 border-gray-600 text-white"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddOption()
                          }
                        />
                        <Button
                          onClick={handleAddOption}
                          className="bg-purple-600/30 border border-purple-500 text-purple-300 hover:bg-purple-600/40"
                        >
                          Add Option
                        </Button>
                      </div>

                      {options.length > 0 && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Correct Answer{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-md text-white p-2 focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select correct answer</option>
                            {options.map((option, index) => (
                              <option
                                key={index}
                                value={option}
                                className="bg-gray-800 text-white"
                              >
                                Option {index + 1}: {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Numeric Answer <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter correct number"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white w-48 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="pt-4 flex gap-3">
                    <Button
                      onClick={handleAddQuestion}
                      disabled={
                        !currentQuestion ||
                        (quizType === "mcq" &&
                          (!options.length || !correctAnswer)) ||
                        (quizType === "integer" && !correctAnswer)
                      }
                      className="bg-green-600/30 border border-green-500 text-green-300 hover:bg-green-600/40"
                    >
                      Save Question
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetQuestionForm}
                      className="border-gray-600 text-gray-400 hover:bg-gray-600/30"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </section>

          {/* Final Actions */}
          {questions.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-700 flex justify-end gap-4">
              <Button className="bg-gray-600/30 border border-gray-500 text-gray-300 hover:bg-gray-600/40">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-purple-600/30 border border-purple-500 text-purple-300 hover:bg-purple-600/40">
                <Zap className="h-4 w-4 mr-2" />
                Publish Quiz
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CreateQuiz;
