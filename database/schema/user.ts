import { sql, type InferSelectModel } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  userID: text('user_id').primaryKey(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  email: text('email').unique().notNull(),
  password: text('password'),
  name: text('name'),
  image: text('image'),
  provider: text('provider'),
})

export type User = InferSelectModel<typeof users>