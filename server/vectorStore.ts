import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { getEmbedding } from "./embed";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, "knowledge");
const STORE_FILE = path.join(__dirname, "vector_cache.json");

const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;

export interface VectorEntry {
  text: string;
  embedding: number[];
  source: string;
}

let store: VectorEntry[] = [];
let initialized = false;

function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length);
    chunks.push(text.slice(start, end));
    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks;
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length === 0 || b.length === 0 || a.length !== b.length) {
    return 0;
  }

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);

  if (magnitude === 0) {
    return 0;
  }

  return dot / magnitude;
}

export async function initVectorStore(): Promise<void> {
  if (initialized) return;

  // Step 1: Try to load from persistent cache
  try {
    const raw = await fs.readFile(STORE_FILE, "utf-8");
    if (raw && raw.trim().length > 0) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        store = parsed;
        initialized = true;
        console.log(`Loaded ${store.length} entries from vector_cache.json cache.`);
        return;
      }
    }
  } catch (err) {
    // File does not exist or is unreadable — proceed to build embeddings
    console.log("No existing vector_cache.json found. Building embeddings...");
  }

  // Step 2: Build embeddings from knowledge markdown files
  const files = await fs.readdir(KNOWLEDGE_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const nextStore: VectorEntry[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(KNOWLEDGE_DIR, file);
    const content = await fs.readFile(filePath, "utf-8");
    const chunks = chunkText(content);

    for (const chunk of chunks) {
      try {
        const embedding = await getEmbedding(chunk);
        nextStore.push({ text: chunk, embedding, source: file });
      } catch (err) {
        console.warn(`Skipping chunk from ${file}: ${(err as Error).message}`);
      }
    }
  }

  store = nextStore;

  // Step 3: Save to disk for future use
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2));
  console.log(`Built and cached ${store.length} entries to vector_cache.json.`);

  initialized = true;
}

export async function retrieve(query: string, topK = 5): Promise<VectorEntry[]> {
  const queryEmbedding = await getEmbedding(query);

  const scored = store.map((entry) => ({
    entry,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.entry);
}