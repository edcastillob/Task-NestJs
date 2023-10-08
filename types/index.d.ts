//NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
