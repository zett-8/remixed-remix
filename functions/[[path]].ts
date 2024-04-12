import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - the server build file is generated by `remix vite:build`
// eslint-disable-next-line import/no-unresolved
import { type ServerBuild } from '@remix-run/cloudflare'
// eslint-disable-next-line import/namespace
import * as build from '../build/server'
import { getLoadContext } from '../load-context'

export const onRequest = createPagesFunctionHandler({
  build: build as unknown as ServerBuild,
  getLoadContext,
})
