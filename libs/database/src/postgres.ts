import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool, type PoolConfig } from 'pg';

export type DispatchDatabase = NodePgDatabase;

export function createPostgresPool(
  connectionString: string,
  config: Omit<PoolConfig, 'connectionString'> = {},
): Pool {
  const pool = new Pool({
    ...config,
    connectionString,
  });

  pool.on('error', (error) => {
    console.error('Unexpected PostgreSQL pool error on idle client', error);
  });

  return pool;
}

export function createDrizzleDatabase(pool: Pool): DispatchDatabase {
  return drizzle(pool);
}

export async function runDrizzleMigrations(
  database: DispatchDatabase,
  migrationsFolder: string,
): Promise<void> {
  await migrate(database, { migrationsFolder });
}
