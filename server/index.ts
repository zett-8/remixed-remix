import { Hono } from 'hono'
import { setMiddlewares } from './middlewares'
import { setHandlers } from './handlers'

const app = new Hono<HonoENV>()

setMiddlewares(app)
setHandlers(app)

export default app
