import 'reflect-metadata';

import { setupOpenApiDocs } from '@dispatch/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { JobsModule } from './jobs.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(JobsModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  setupOpenApiDocs(app, {
    title: 'Dispatch Jobs API',
    description: 'Job orchestration API for Dispatch.',
  });

  await app.listen(process.env.JOBS_PORT ?? '3002');
}

void bootstrap();
