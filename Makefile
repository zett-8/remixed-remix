migration-file:
	pnpm drizzle-kit generate:sqlite --out migrations --schema app/db/schema

migration-apply:
	pnpm exec wrangler d1 migrations apply <CF_D1_NAME>