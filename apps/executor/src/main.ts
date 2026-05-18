import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { ExecutorModule } from './executor.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(ExecutorModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
}

void bootstrap();
