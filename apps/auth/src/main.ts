import 'reflect-metadata';

import { setupOpenApiDocs } from '@dispatch/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { AuthModule } from './auth.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AuthModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  setupOpenApiDocs(app, {
    title: 'Dispatch Auth API',
    description: 'Authentication service API for Dispatch.',
  });

  await app.listen(process.env.AUTH_PORT ?? '3001');
}

void bootstrap();
