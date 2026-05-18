import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface OpenApiOptions {
  title: string;
  description: string;
  version?: string;
}

export function setupOpenApiDocs(
  app: INestApplication,
  { title, description, version = '0.1.0' }: OpenApiOptions,
): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);
}
