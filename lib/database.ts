import { Pool, PoolClient } from 'pg';

// Database connection configuration
const connectionString = process.env.DIRECT_URL || 'postgresql://FBO-Admin-Panel_owner:zTQ6MYlEbre2@ep-quiet-frost-a5qruv32.us-east-2.aws.neon.tech/FBO-Admin-Panel?sslmode=require';

// Create a connection pool
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // Maximum number of clients in the pool
  min: 2, // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
  allowExitOnIdle: true, // Allow the pool to close all connections and exit when idle
});

// Global variable to store the pool in development
const globalForPool = global as unknown as {
  pool: Pool | undefined
}

export const db = globalForPool.pool ?? pool;

if (process.env.NODE_ENV !== "production") globalForPool.pool = db;

// Helper function to execute queries with retry logic
export async function query(text: string, params?: any[], retries: number = 3): Promise<any> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    let client;
    try {
      client = await db.connect();
      const result = await client.query(text, params);
      return result;
    } catch (error) {
      lastError = error as Error;
      console.error(`Database query attempt ${attempt} failed:`, error);
      
      if (attempt === retries) {
        throw new Error(`Database query failed after ${retries} attempts: ${lastError.message}`);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  
  throw lastError!;
}

// Helper function to execute transactions
export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}
