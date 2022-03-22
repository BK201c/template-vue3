/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly APP_TITLE: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
