import { Hono } from 'hono'

const app = new Hono<HonoENV>()

app.use(async (c, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})

export default app
