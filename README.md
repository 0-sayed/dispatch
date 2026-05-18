# Dispatch

Dispatch is a distributed job-processing engine built with NestJS microservices.

## Stack

- Node.js 22.14.0
- pnpm 10.26.2
- NestJS
- PostgreSQL + Drizzle
- Apache Pulsar
- Vitest, Supertest, Testcontainers
- Docker Compose

## Project Shape

```text
apps/
  auth/       HTTP service for authentication
  jobs/       HTTP service for job orchestration
  products/   HTTP service for product ingestion
  executor/   background execution context
libs/
  common/     health and OpenAPI helpers
  database/   Drizzle/PostgreSQL helpers
  logging/    Pino logging helpers
  graphql/    GraphQL boundary
  grpc/       gRPC boundary
  pulsar/     Pulsar boundary
```

## Setup

```bash
pnpm install
cp .env.example .env
make infra
```

HTTP apps expose scaffold docs at `/docs`, OpenAPI JSON at `/docs-json`, and health at `/health`.

## Commands

```bash
make infra       # start PostgreSQL and Pulsar
make infra-down  # stop local backing services
make check       # lint, type-check, unit tests
make validate    # full local gate
make test        # all tests
make build       # build apps and libs
```

## Validation

The full local gate is:

```bash
pnpm validate
```

This runs lint, type-check, tests, Knip, high-severity audit, and build.

`gitleaks` is used by the pre-commit hook and must be installed on the developer machine.

## License

MIT
