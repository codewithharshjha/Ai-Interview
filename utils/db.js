import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
const sql = neon("postgresql://harshjhamusicproducer:pMm6vEVLuiU4@ep-damp-wildflower-a28cjppw.eu-central-1.aws.neon.tech/AI-Interview?sslmode=requir");
export const db = drizzle(sql,{schema});

// const result = await db.select().from(...);
