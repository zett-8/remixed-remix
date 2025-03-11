import { type AppLoadContext, createCookie, createCookieSessionStorage, type SessionStorage } from 'react-router'
import type { Context } from 'hono'
import type { PlatformProxy } from 'wrangler'

type Cloudflare = Omit<PlatformProxy, 'dispose' | 'env'> & { env: Env }

declare module 'react-router' {
  interface AppLoadContext {
    cloudflare: Cloudflare
    hono: {
      context: Context<HonoENV>
    }
    sessionStorage: SessionStorage
  }
}

type GetLoadContext = (args: {
  request: Request
  context: {
    cloudflare: Cloudflare
    hono: { context: Context<HonoENV> }
  }
}) => AppLoadContext

export const getLoadContext: GetLoadContext = ({ context }) => {
  const SECRET = context.cloudflare.env.SESSION_SECRET
  if (!SECRET) {
    throw new Error("There's no Environmental variable: SESSION_SECRET")
  }

  const sessinCookie = createCookie('__session', {
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [SECRET], // replace this with an actual secret
    secure: !context.cloudflare.env.DEV, // enable this in prod only
    maxAge: 60 * 60 * 24 * 30,
  })

  return {
    ...context,
    sessionStorage: createCookieSessionStorage({
      cookie: sessinCookie,
    }),
  }
}
