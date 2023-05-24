declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN?: string;
      PORT?: string;
    }
  }
}

export {};
