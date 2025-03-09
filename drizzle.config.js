import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_hpfVL7Rqr9uY@ep-frosty-paper-a8n7v818-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
  verbose: true,
  strict: true,
})
