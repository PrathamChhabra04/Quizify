"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAIExplanation = async (question, correctAnswer) => {
  try {
    const prompt = `As a person with very high knowledge in vairous topics, explain this quiz question and its answer in simple terms. Keep it under 150 characters.\n\nQuestion: ${question}\nCorrect Answer: ${correctAnswer}\nExplanation:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const exp = response.text().trim();
    return exp;
  } catch (error) {
    console.error("AI Error:", error);
    return "Could not get explanation. Please try again.";
  }
};
