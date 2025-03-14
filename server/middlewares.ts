import type { Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema/index'
import { contextStorage } from 'hono/context-storage'
import { logger } from 'hono/logger'
import { appendTrailingSlash } from 'hono/trailing-slash'
import { compress } from 'hono/compress'

export const setMiddlewares = (app: Hono<HonoENV>): Hono<HonoENV> => {
  app.use(appendTrailingSlash())
  app.use(logger())
  app.use(compress())
  app.use(contextStorage())

  app.use(async (c, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    c.res.headers.set('X-Response-Time', `${end - start}`)
  })

  app.use(setD1)
  app.use('*', clerkMiddleware())
  app.use('/dashboard/*', setAuthForDashboard)
  app.use('/api/*', setAuthForAPI)

  return app
}

const F = createFactory<HonoENV>()

const setD1 = F.createMiddleware(async (c, next) => {
  c.set('db', drizzle(c.env.DB, { schema }))
  return next()
})

const setAuthForDashboard = F.createMiddleware(async (c, next) => {
  const auth = getAuth(c)

  if (!auth || !auth.userId) {
    return c.redirect('/')
  }

  c.set('userId', auth.userId)
  return next()
})

const setAuthForAPI = F.createMiddleware(async (c, next) => {
  const auth = getAuth(c)

  if (auth && auth.userId) {
    c.set('userId', auth.userId)
    return next()
  }

  // do some other auth logic for API
  return next()
})
