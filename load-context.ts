import { type PlatformProxy } from 'wrangler'
import { SessionStorage, createCookie, createWorkersKVSessionStorage, AppLoadContext } from '@remix-run/cloudflare'
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>
type LoadContext = {
  cloudflare: Cloudflare
}

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    env: Cloudflare['env']
    cf: Cloudflare['cf']
    ctx: Cloudflare['ctx']
    cache: Cloudflare['caches']
    sessionStorage: SessionStorage
    db: DrizzleD1Database
  }
}

export const getLoadContext = ({ context }: { request: Request; context: LoadContext }): AppLoadContext => {
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
    env: context.cloudflare.env,
    cf: context.cloudflare.cf,
    ctx: context.cloudflare.ctx,
    cache: context.cloudflare.caches,
    sessionStorage: createWorkersKVSessionStorage({
      cookie: sessinCookie,
      kv: context.cloudflare.env.SESSION_KV,
    }),
    db: drizzle(context.cloudflare.env.DB),
  }
}
