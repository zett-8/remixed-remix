// global.d.ts
import type { D1Database } from '@cloudflare/workers-types/experimental'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '../database/schema/index'

declare global {
  type HonoENV = {
    Bindings: {
      DB: D1Database
    }
    Variables: {
      db: DrizzleD1Database<typeof schema>
      userId: string
    }
  }
}

export {}
