import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool, type PoolConfig } from 'pg';

export type DispatchDatabase = NodePgDatabase;

export function createPostgresPool(
  connectionString: string,
  config: Omit<PoolConfig, 'connectionString'> = {},
): Pool {
  return new Pool({
    ...config,
    connectionString,
  });
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
