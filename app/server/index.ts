// server/index.ts
import { Hono } from 'hono'

type Bindings = {
    db: D1Database 
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', (c, next) => {
    console.log('middleware')
    console.log('DB -> ',c.env)   
    return next()  
})

app.get('/api/', (c) => c.text('Hello World'))  

export default app
