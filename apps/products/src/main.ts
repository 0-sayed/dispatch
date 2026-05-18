import 'reflect-metadata';

import { setupOpenApiDocs } from '@dispatch/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { ProductsModule } from './products.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(ProductsModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  setupOpenApiDocs(app, {
    title: 'Dispatch Products API',
    description: 'Product ingestion API for Dispatch.',
  });

  await app.listen(process.env.PRODUCTS_PORT ?? '3003');
}

void bootstrap();
