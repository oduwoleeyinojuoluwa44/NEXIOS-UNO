declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
  }
}

// Support for environments that might use import.meta
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}