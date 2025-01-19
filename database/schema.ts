import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const guestBook = sqliteTable('guestBook', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
})
