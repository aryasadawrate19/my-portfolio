import { answerQuestion } from "../server/rag.js";

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  socket?: {
    remoteAddress?: string;
  };
  body?: {
    question?: string;
  };
};

type ApiResponse = {
  setHeader?: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

type RateLimitState = {
  count: number;
  windowStart: number;
};

const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RAG_RATE_LIMIT_MAX_REQUESTS ?? 15);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RAG_RATE_LIMIT_WINDOW_MS ?? 60_000);
const rateLimitStore = new Map<string, RateLimitState>();

function getClientIp(req: ApiRequest): string {
  const rawForwarded = req.headers?.["x-vercel-forwarded-for"];
  const forwarded = Array.isArray(rawForwarded) ? rawForwarded[0] : rawForwarded;
  if (forwarded && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function checkRateLimit(ip: string): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now - existing.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - existing.windowStart);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return { allowed: true };
}

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, state] of rateLimitStore.entries()) {
    if (now - state.windowStart >= RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(ip);
    }
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  cleanupRateLimitStore();
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(clientIp);

  if (!rateLimitResult.allowed) {
    const denied = rateLimitResult as { allowed: false; retryAfterSeconds: number };
    res.setHeader?.("Retry-After", String(denied.retryAfterSeconds));
    return res.status(429).json({
      error: "Too many requests. Please try again shortly.",
      retryAfterSeconds: denied.retryAfterSeconds,
    });
  }

  const question = req.body?.question;

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return res.status(400).json({ error: "question is required" });
  }

  try {
    const answer = await answerQuestion(question);
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Failed to answer question:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}