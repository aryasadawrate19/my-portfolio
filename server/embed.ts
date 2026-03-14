import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getEmbedding(text: string): Promise<number[]> {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    throw new Error("Cannot generate embedding for empty text");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  const result = await model.embedContent(trimmed);
  return result.embedding.values;
}