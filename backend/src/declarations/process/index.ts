declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    ORGANIZATION_HTTP_HEADER: string
    JWT_SECRET: string
  }
}
