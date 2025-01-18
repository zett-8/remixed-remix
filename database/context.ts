import { AsyncLocalStorage } from "node:async_hooks";

import type { DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "./schema";

export const DatabaseContext = new AsyncLocalStorage<
  DrizzleD1Database<typeof schema>
>();

export function database() {
  const db = DatabaseContext.getStore();
  if (!db) {
    throw new Error("DatabaseContext not set");
  }
  return db;
}
