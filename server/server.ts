import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { initVectorStore } from "./vectorStore";
import { answerQuestion } from "./rag";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Global rate limit - applies to all routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,                   // max 50 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

// Strict rate limit - applies only to the LLM route
const llmLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // max 5 LLM requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "LLM rate limit exceeded. Please wait a moment before asking again." },
});

app.use(globalLimiter);

// In-memory response cache for /api/ask
type CacheEntry = { answer: string; expiresAt: number };

const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = Number(process.env.RAG_CACHE_TTL_MS ?? 5 * 60 * 1000); // default 5 min
const CACHE_MAX_ENTRIES = Number(process.env.RAG_CACHE_MAX_ENTRIES ?? 200);  // default 200

function normalizeQuestion(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, " ");
}

function getCachedAnswer(key: string): string | null {
  const hit = responseCache.get(key);
  if (!hit) return null;

  if (Date.now() > hit.expiresAt) {
    responseCache.delete(key);
    return null;
  }

  return hit.answer;
}

function setCachedAnswer(key: string, answer: string): void {
  if (responseCache.size >= CACHE_MAX_ENTRIES) {
    const oldestKey = responseCache.keys().next().value as string | undefined;
    if (oldestKey) responseCache.delete(oldestKey);
  }

  responseCache.set(key, {
    answer,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

// Periodic cleanup of expired entries
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of responseCache.entries()) {
    if (now > value.expiresAt) responseCache.delete(key);
  }
}, 60 * 1000).unref();

app.post("/api/ask", llmLimiter, async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const cacheKey = normalizeQuestion(question);
    const cached = getCachedAnswer(cacheKey);

    if (cached) {
      return res.json({ answer: cached });
    }

    const answer = await answerQuestion(question);
    setCachedAnswer(cacheKey, answer);

    return res.json({ answer });
  } catch (err) {
    console.error("Error answering question:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;

async function start() {
  await initVectorStore();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();