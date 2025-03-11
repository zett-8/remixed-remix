import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { contextStorage, getContext } from 'hono/context-storage'
import * as schema from '../database/schema/index'
import { drizzle } from 'drizzle-orm/d1'

const app = new Hono<HonoENV>()

app.use(contextStorage())

app.use(async (c, next) => {
  const start = Date.now()

  c.set('db', drizzle(c.env.DB, { schema }))

  await next()

  const end = Date.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})

app.use('*', clerkMiddleware())

app.use('/dashboard/*', async (c, next) => {
  const auth = getAuth(c)

  if (!auth || !auth.userId) {
    return c.redirect('/')
  }

  c.set('userId', auth.userId)
  return next()
})

app.get('/api/healthcheck', (c) => {
  return c.json({ status: 'ok' })
})

app.get('/api/users', async (c) => {
  const _db = getContext<HonoENV>().var.db
  // Do something with the db
  return c.json({})
})

export default app
