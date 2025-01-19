import type { Config } from 'drizzle-kit'

export default {
  out: './drizzle',
  schema: './database/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    databaseId: 'your-database-id',
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    token: process.env.CLOUDFLARE_TOKEN!,
  },
} satisfies Config
