"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Plus, X, CheckSquare, Hash } from "lucide-react"; // Added icons
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
    <div className="min-h-screen">
      {" "}
      {/* Added background color */}
      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8"
        >
          <header className="mb-8">
            {" "}
            {/* Better semantic markup */}
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Create a New Quiz
            </h1>
            <p className="mt-2 text-gray-600">
              Choose quiz type and set up questions
            </p>
          </header>

          {/* Quiz Metadata Section */}
          <section className="space-y-8">
            <div>
              <label
                htmlFor="quizTitle"
                className="block text-sm font-semibold text-black mb-1"
              >
                <span className="text-lg">Quiz Title</span>{" "}
                <span className="text-red-500">*</span>{" "}
                {/* Required indicator */}
              </label>
              <Input
                id="quizTitle"
                type="text"
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="max-w-md text-black ring-1 ring-gray-300" // Added ring
              />
            </div>

            {/* Quiz Type Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quiz Type <span className="text-red-500">*</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  variant={quizType === "mcq" ? "purp" : "outline"}
                  className="h-auto py-6 flex flex-col items-center gap-2 group"
                  onClick={() => setQuizType("mcq")}
                >
                  <CheckSquare className="h-6 w-6 mb-2 group-hover:text-white" />
                  <span className="text-lg font-semibold">Multiple Choice</span>
                  <span className="text-sm text-muted-foreground">
                    Questions with multiple options
                  </span>
                </Button>
                <Button
                  variant={quizType === "integer" ? "purp" : "outline"}
                  className="h-auto py-6 flex flex-col items-center gap-2 group"
                  onClick={() => setQuizType("integer")}
                >
                  <Hash className="h-6 w-6 mb-2 group-hover:text-white" />
                  <span className="text-lg font-semibold">Integer Based</span>
                  <span className="text-sm text-muted-foreground">
                    Questions with numeric answers
                  </span>
                </Button>
              </div>
            </div>

            {/* Quiz Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quiz Settings
              </h2>
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                {" "}
                {/* Added container */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={timePerQuestion}
                        onChange={(e) =>
                          setTimePerQuestion(Number(e.target.value))
                        }
                        className="w-20 px-3 py-2 bg-white border rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                        min="5"
                        max="300"
                      />
                      <span className="text-gray-600">
                        seconds per question
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-md">
                  {" "}
                  {/* Added container */}
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-semibold text-gray-900">
                    {questions.length}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Question Creation Section */}
          <section className="mt-8 pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Quiz Questions
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {questions.length} questions added
                </p>
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto"
                disabled={!quizType || !quizTitle.trim()}
                onClick={() => setShowQuestionForm(true)}
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </div>
              </Button>
            </div>

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="mt-6 space-y-4">
                {questions.map((q, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          Q{index + 1}: {q.question}
                        </p>
                        {"options" in q && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">
                              Options: {q.options.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Correct Answer:{" "}
                          {"options" in q ? q.correctAnswer : q.correctAnswer}
                        </span>
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
                className="mt-8 pt-8 border-t"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Add New Question
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your question"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      className="text-black ring-1 ring-gray-300" // Added ring
                    />
                  </div>

                  {quizType === "mcq" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={option}
                              readOnly
                              className="flex-1 text-black bg-gray-50" // Subtle background
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveOption(index)}
                              className="text-red-500 hover:bg-red-50" // Color feedback
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Add new option"
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                          className="flex-1 text-black"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddOption()
                          }
                        />
                        <Button
                          onClick={handleAddOption}
                          variant="outline"
                          className="border-primary text-primary hover:bg-black/80"
                        >
                          Add Option
                        </Button>
                      </div>

                      {options.length > 0 && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correct Answer{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-900 rounded-md bg-white text-black cursor-pointer"
                          >
                            <option value="">Select correct answer</option>
                            {options.map((option, index) => (
                              <option key={index} value={option}>
                                Option {index + 1}: {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correct Answer (Integer){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter the correct answer"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="max-w-[250px] text-black ring-1 ring-gray-300" // Added ring
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
                      className="border text-black"
                    >
                      Save Question
                    </Button>
                    <Button variant="outline" onClick={resetQuestionForm}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </section>

          {/* Final Actions */}
          {questions.length > 0 && (
            <div className="mt-8 pt-8 border-t flex justify-end gap-4">
              <Button variant="outline">Save Draft</Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
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
