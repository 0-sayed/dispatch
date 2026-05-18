import { randomUUID } from 'node:crypto';
import type { IncomingMessage } from 'node:http';

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import type { Options } from 'pino-http';

const CORRELATION_ID_HEADER = 'x-request-id';

function getLogLevel(): string {
  return process.env.LOG_LEVEL ?? 'info';
}

function readCorrelationId(request: IncomingMessage): string {
  const header = request.headers[CORRELATION_ID_HEADER];

  if (typeof header === 'string' && header.trim().length > 0) {
    return header;
  }

  if (Array.isArray(header) && typeof header[0] === 'string') {
    return header[0];
  }

  return randomUUID();
}

function createPinoHttpOptions(): Options {
  return {
    level: getLogLevel(),
    customAttributeKeys: {
      reqId: 'correlationId',
    },
    genReqId: (request, response) => {
      const correlationId = readCorrelationId(request);
      response.setHeader(CORRELATION_ID_HEADER, correlationId);

      return correlationId;
    },
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.token',
      ],
      censor: '[redacted]',
    },
  };
}

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: createPinoHttpOptions(),
    }),
  ],
  exports: [LoggerModule],
})
export class DispatchLoggingModule {}
