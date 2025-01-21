import type { ExecutionContext } from '@cloudflare/workers-types'
import { type AppLoadContext } from 'react-router'

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
  }
}

export function getLoadContext(cloudflare: AppLoadContext['cloudflare']) {
  return {
    cloudflare,
    env: {
      ...cloudflare.env,
    },
  }
}
