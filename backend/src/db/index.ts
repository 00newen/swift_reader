import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from './schema.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
// Go up two directories from the current file location to reach the backend root
config({ path: resolve(__dirname, '../../.env') });

// Check if the required environment variable is set
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is required');
}

// Create a PostgreSQL connection pool
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Create the Drizzle database instance
export const db = drizzle(pool, { schema });

// Export the pool for direct access if needed
export const pgPool = pool;
