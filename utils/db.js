import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
const sql = neon("postgresql://neondb_owner:npg_hpfVL7Rqr9uY@ep-frosty-paper-a8n7v818-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql,{schema});

// const result = await db.select().from(...);
