export const api: typeof chrome =
  (globalThis as any).browser ?? globalThis.chrome;
