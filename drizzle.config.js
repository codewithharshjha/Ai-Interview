import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://harshjhamusicproducer:pMm6vEVLuiU4@ep-damp-wildflower-a28cjppw.eu-central-1.aws.neon.tech/AI-Interview?sslmode=requir",
  },
  verbose: true,
  strict: true,
})
