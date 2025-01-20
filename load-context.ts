import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from './database/schema/index'
import type { ExecutionContext } from '@cloudflare/workers-types'
import { type AppLoadContext, createCookie, createCookieSessionStorage, type SessionStorage } from 'react-router'

declare global {
  // eslint-disable-next-line
  interface CloudflareEnvironment extends Env {}
}

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment
      ctx: ExecutionContext
    }
    env: CloudflareEnvironment
    db: DrizzleD1Database<typeof schema>
    sessionStorage: SessionStorage
  }
}

export function getLoadContext(cloudflare: AppLoadContext['cloudflare']) {
  const SECRET = cloudflare.env.SESSION_SECRET

  if (!SECRET) {
    throw new Error("There's no Environmental variable: SESSION_SECRET")
  }

  const sessinCookie = createCookie('__session', {
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [SECRET], // replace this with an actual secret
    secure: !cloudflare.env.DEV, // enable this in prod only
    maxAge: 60 * 60 * 24 * 30,
  })

  const db = drizzle(cloudflare.env.DB, { schema })

  return {
    cloudflare,
    env: {
      ...cloudflare.env,
    },
    sessionStorage: createCookieSessionStorage({
      cookie: sessinCookie,
    }),
    db,
  }
}
