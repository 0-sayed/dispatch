import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { setupOpenApiDocs } from '@dispatch/common';

import { AuthModule } from './auth.module';

describe('Auth API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useLogger(false);
    setupOpenApiDocs(app, {
      title: 'Dispatch Auth API',
      description: 'Authentication service API for Dispatch.',
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('exposes the health endpoint', async () => {
    await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((response) => {
        expect(response.body).toMatchObject({ status: 'ok' });
      });
  });

  it('exposes OpenAPI JSON for scaffold endpoints', async () => {
    await request(app.getHttpServer())
      .get('/docs-json')
      .expect(200)
      .expect((response) => {
        expect(response.body).toMatchObject({
          info: { title: 'Dispatch Auth API' },
          paths: expect.objectContaining({
            '/health': expect.any(Object),
          }),
        });
      });
  });
});
