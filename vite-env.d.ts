/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  // add other env vars here if needed later
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
