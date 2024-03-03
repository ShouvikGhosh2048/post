import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import * as schema from './schema';
import { sql } from '@vercel/postgres';

const db = drizzle(sql, { schema });

await migrate(db, { migrationsFolder: './drizzle' });