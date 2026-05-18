# AGENTS.md instructions for Dispatch

Every output may be reviewed by a senior engineer. Shortcuts, hand-waving, and plausible-but-wrong implementations are not acceptable.

## Repository Shape

- Dispatch is a NestJS/TypeScript monorepo for a distributed job-processing engine.
- Package manager: `pnpm@10.26.2`.
- Runtime: Node `22.14.0`.
- Workspace: pnpm workspaces with Nx project metadata.
- Apps:
  - `apps/auth` — HTTP Nest app for authentication.
  - `apps/jobs` — HTTP Nest app for job orchestration.
  - `apps/products` — HTTP Nest app for product ingestion.
  - `apps/executor` — Nest application context for background execution.
- Shared libs:
  - `libs/common` — health endpoint and OpenAPI helpers.
  - `libs/logging` — Pino/Nest logging and correlation IDs.
  - `libs/database` — Drizzle/PostgreSQL helpers.
  - `libs/graphql`, `libs/grpc`, `libs/pulsar` — transport boundaries.

## Commands

- Install: `pnpm install`.
- Start local backing services: `make infra`.
- Stop local backing services: `make infra-down`.
- Lint: `pnpm lint`.
- Type check: `pnpm typecheck`.
- Build: `pnpm build`.
- Full local gate: `pnpm validate`.
- Unit tests: `pnpm test:unit`.
- Integration tests: `pnpm test:integration`.
- E2E tests: `pnpm test:e2e`.
- Coverage: `pnpm test:coverage`.
- Drizzle generate: `pnpm db:generate`.
- Drizzle migrate: `pnpm db:migrate`.

## Local Services

- Docker Compose provides PostgreSQL and Apache Pulsar.
- Use `.env.example` as the variable contract; do not put real secrets there.
- Host ports are env-driven for worktree isolation.
- Do not add hardcoded Compose `container_name` values.
- Keep worktree-friendly port/env behavior when changing local infrastructure.

## API And Runtime Conventions

- HTTP apps expose Swagger UI at `/docs` and OpenAPI JSON at `/docs-json`.
- Scaffold-level health endpoints live under `/health`.
- Use `DispatchLoggingModule` for Nest apps that need structured logging.
- Preserve graceful shutdown hooks in app entrypoints.
- Keep feature behavior out of scaffold-only changes.

## Testing Conventions

- Vitest projects are split into unit, integration, and e2e.
- Unit tests: `*.spec.ts`.
- Integration tests: `*.integration-spec.ts`.
- E2E tests: `*.e2e-spec.ts`.
- Prefer behavioral assertions over implementation-detail assertions.
- Integration tests may use Testcontainers for real backing services.

## Planning Workflow

- Planning lives under `planning/`.
- Feature work starts from `planning/roadmap/tasks.md`.
- Each roadmap task is PR-sized and lists its context files.
- Before implementing a task, read only the context files named by that task plus nearby code.
- Temporary implementation plans may be created during a task, but do not keep stale plan files.

## Step-Specific Notes

- For dependency or framework questions, check current official docs before locking in guidance.
- Use Drizzle for database work in this repo.
- Use Apache Pulsar for the course-aligned broker path unless the user explicitly changes the decision.
- Do not introduce Redis/BullMQ/RabbitMQ as replacements without a user-approved decision change.
