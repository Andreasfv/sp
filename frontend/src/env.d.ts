/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NODE_ENV: 'LOCAL' | 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION'
  readonly VITE_APP_STAGE: 'local' | 'development' | 'staging' | 'production'
  readonly VITE_APP_API_URL: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
