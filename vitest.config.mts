import { resolve } from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@dispatch/common',
        replacement: resolve(import.meta.dirname, 'libs/common/src/index.ts'),
      },
      {
        find: '@dispatch/logging',
        replacement: resolve(import.meta.dirname, 'libs/logging/src/index.ts'),
      },
      {
        find: /^@dispatch\/(.+)$/,
        replacement: resolve(import.meta.dirname, 'libs/$1/src/index.ts'),
      },
    ],
  },
  test: {
    environment: 'node',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['apps/**/*.spec.ts', 'libs/**/*.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: [
            'apps/**/*.integration-spec.ts',
            'libs/**/*.integration-spec.ts',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['apps/**/*.e2e-spec.ts', 'libs/**/*.e2e-spec.ts'],
        },
      },
    ],
    restoreMocks: true,
    setupFiles: ['./test/setup.ts'],
    hookTimeout: 60_000,
    testTimeout: 60_000,
    coverage: {
      provider: 'v8',
      include: ['apps/**/*.ts', 'libs/**/*.ts'],
      exclude: [
        '**/*.spec.ts',
        '**/*.integration-spec.ts',
        '**/*.e2e-spec.ts',
        '**/main.ts',
        '**/*.module.ts',
        '**/index.ts',
        'libs/database/src/schema/**',
      ],
      thresholds: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },
    },
  },
});
