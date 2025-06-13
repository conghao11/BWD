import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

// Kết nối bằng postgres-js
const client = postgres(process.env.DATABASE_URL, { max: 1 }); // max connections = 1

export const db = drizzle(client, { schema });
