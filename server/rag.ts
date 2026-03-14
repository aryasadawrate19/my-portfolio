import { GoogleGenerativeAI } from "@google/generative-ai";
import { retrieve } from "./vectorStore";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

export async function answerQuestion(question: string): Promise<string> {
  const results = await retrieve(question);
  const context = results.map((r) => r.text).join("\n\n");

  const q = question.trim();

  const prompt = `You are the AI assistant for Arya Sadawrate's portfolio.

Answer questions using ONLY the provided context.

If the answer cannot be found in the context, respond with:
"I don't have that information in Arya's portfolio."

Keep answers concise (2–4 sentences).

Portfolio Knowledge Base:
${context}

Question:
${q}`;

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  return result.response.text();
}