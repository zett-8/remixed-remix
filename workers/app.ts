import { drizzle } from 'drizzle-orm/d1'
import { createRequestHandler } from 'react-router'

import { DatabaseContext } from '~/database/context'
import * as schema from '~/database/schema'

interface CloudflareEnvironment {
  DB: D1Database
}

declare module 'react-router' {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string
    env: CloudflareEnvironment
    ctx: ExecutionContext
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  // eslint-disable-next-line
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
)

export default {
  fetch(request, env, ctx) {
    const db = drizzle(env.DB, { schema })
    return DatabaseContext.run(db, () =>
      requestHandler(request, {
        VALUE_FROM_CLOUDFLARE: 'Hello from Cloudflare',
        env,
        ctx,
      })
    )
  },
} satisfies ExportedHandler<CloudflareEnvironment>
