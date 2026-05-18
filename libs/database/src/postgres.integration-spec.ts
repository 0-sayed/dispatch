import { PostgreSqlContainer } from '@testcontainers/postgresql';
import type { Pool } from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createDrizzleDatabase, createPostgresPool } from './postgres';

describe('createPostgresPool', () => {
  let pool: Pool | undefined;
  let stopContainer: (() => Promise<unknown>) | undefined;

  beforeAll(async () => {
    const container = await new PostgreSqlContainer(
      'postgres:17-alpine',
    ).start();

    stopContainer = () => container.stop();
    pool = createPostgresPool(container.getConnectionUri());
  });

  afterAll(async () => {
    await pool?.end();
    await stopContainer?.();
  });

  it('connects to a real PostgreSQL container', async () => {
    if (!pool) {
      throw new Error('PostgreSQL pool was not initialized');
    }

    const result = await pool.query<{ value: string }>(
      'select $1::text as value',
      ['dispatch'],
    );

    expect(result.rows).toEqual([{ value: 'dispatch' }]);
    expect(createDrizzleDatabase(pool)).toBeDefined();
  });
});
