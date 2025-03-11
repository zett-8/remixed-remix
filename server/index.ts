import { Hono } from 'hono'
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

app.get('/api/healthcheck', (c) => {
  return c.json({ status: 'ok' })
})

app.get('/api/users', async (c) => {
  const db = getContext<HonoENV>().var.db
  const users = await db.select().from(schema.users)
  return c.json(users)
})

export default app
