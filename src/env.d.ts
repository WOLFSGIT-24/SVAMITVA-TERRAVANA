/// <reference types="astro/client" />

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly BASE_NAME?: string;
  }
}
