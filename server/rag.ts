import { GoogleGenerativeAI } from "@google/generative-ai";
import store from "./vectorstore.json";

type StoreChunk = {
  text: string;
  source?: string;
};

const runtimeStore: StoreChunk[] = Array.isArray(store) ? (store as StoreChunk[]) : [];

const INTENT_MAP: Record<string, string[]> = {
  projects: [
    "projects",
    "what projects",
    "things you built",
    "work you built",
    "portfolio projects",
    "ai projects",
    "built"
  ],
  technologies: [
    "technologies",
    "tech stack",
    "tools",
    "programming languages",
    "frameworks",
    "stack",
    "skills"
  ],
  education: [
    "education",
    "study",
    "college",
    "degree",
    "university",
    "school"
  ],
  experience: [
    "experience",
    "work experience",
    "internships",
    "jobs",
    "worked",
    "career"
  ],
  inspiration: [
    "why ai",
    "inspiration",
    "why you started",
    "what motivated you",
    "motivation",
    "inspired"
  ]
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

function normalizeForMatch(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeIntent(question: string): string {
  const normalizedQuestion = normalizeForMatch(question);

  for (const [intent, patterns] of Object.entries(INTENT_MAP)) {
    if (patterns.some((pattern) => normalizedQuestion.includes(normalizeForMatch(pattern)))) {
      return intent;
    }
  }

  return "general";
}

function uniqueKeywords(question: string, intent: string): string[] {
  const tokens = normalizeForMatch(question)
    .split(" ")
    .filter((token) => token.length > 2);

  return [...new Set([...tokens, intent])];
}

function retrieveContextChunks(question: string): StoreChunk[] {
  const intent = normalizeIntent(question);
  const keywords = uniqueKeywords(question, intent);

  const matches = runtimeStore
    .filter((chunk) => {
      const text = chunk.text.toLowerCase();
      return keywords.some((keyword) => text.includes(keyword));
    })
    .slice(0, 5);

  if (matches.length > 0) {
    return matches;
  }

  return runtimeStore.slice(0, 6);
}

export async function answerQuestion(question: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const contextChunks = retrieveContextChunks(question);
  const context = contextChunks.map((chunk) => chunk.text).join("\n\n");

  const q = question.trim();

  const prompt = `You are speaking as Arya Sadawrate in first person for a developer portfolio assistant.

Answer questions using ONLY the information provided in the context.

Style rules:
- Use first person singular ("I", "my", "me") in every answer.
- Never refer to Arya in third person.
- Use clear, professional English with correct spelling and grammar.
- Do not copy typos from the context; rewrite them correctly.
- Keep answers concise (2-4 sentences).

If the answer cannot be found in the context, respond with exactly:
"I don't have that information in my portfolio."

Portfolio Knowledge Base:
${context}

Question:
${q}`;

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  return result.response.text();
}