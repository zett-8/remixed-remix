import { createFactory } from 'hono/factory'

const F = createFactory<HonoENV>()

export const getUsers = F.createHandlers(async (c) => {
  const users = await c.get('db').query.users.findMany()
  if (!users) {
    return c.json({ error: 'No users found' }, 404)
  }
  return c.json(users, 200)
})
