# Architecture Notes

## Default Build Path

```text
Dispatch
├── Auth service
├── Jobs service
├── Executor service
├── Products service
├── GraphQL public API
├── gRPC internal transport
├── Apache Pulsar message broker
├── PostgreSQL databases
├── Drizzle ORM and migrations
├── Product JSON import workload
├── Job status persistence
├── Docker images
├── Local Kubernetes with Minikube and Helm
└── AWS deployment later
```

## Service Split

- Public API and internal transport are separate: GraphQL over HTTP for clients, gRPC for service-to-service calls.
- Auth owns users, login, JWT verification.
- Jobs owns job metadata, job discovery, enqueueing, upload references, and job status.
- Executor owns background consumption and job execution.
- Products owns product/category persistence and product enrichment.
- Executor is the main horizontal scaling unit. More executor instances means more Pulsar consumers sharing the same subscription.
- Keep service/database boundaries explicit. Auth, Jobs, and Products each get their own database connection/config in the course model.

## GraphQL API

- Auth GraphQL:
  - create user
  - login
  - login sets an HTTP-only JWT cookie instead of exposing a token to browser JavaScript
- Jobs GraphQL:
  - `jobs` query exposes available job metadata
  - `executeJob` mutation accepts a job name and dynamic JSON data
  - persisted job list/detail queries expose progress and status
- Job registry pattern:
  - decorate job classes with metadata
  - discover jobs at startup
  - expose discovered jobs through GraphQL
  - execute by job name
- Batch jobs accept an array of payloads and publish one Pulsar message per item.

## Auth

- Prefer JWT in HTTP-only cookies.
- Set secure cookies only in production so local development still works.
- Cookie expiration should match JWT expiration.
- GraphQL auth reads JWT from `request.cookies.authentication`.
- gRPC auth passes token through the internal request and lets Auth verify it.
- Use a `CurrentUser` decorator so resolvers consume authenticated user context instead of parsing tokens repeatedly.

## gRPC

- Keep `.proto` contracts outside app source so services share the same definitions.
- Generate TypeScript from proto definitions and make generation part of build/serve dependencies.
- Auth is a hybrid Nest app: GraphQL/HTTP for public auth operations and gRPC for internal auth verification.
- Jobs uses a GraphQL auth guard that:
  - extracts cookie token
  - calls Auth over gRPC
  - attaches the returned user to request context
- Products gRPC exposes `createProduct`.
- Executor calls Products gRPC after consuming each product message.
- Jobs gRPC exposes `acknowledge(jobId)` so executor can report completed units.
- Build output must include proto files; otherwise runtime gRPC loading fails.

## Pulsar

- Local dev can run standalone Pulsar in Docker on port `6650`.
- Use a shared Pulsar library around the native client.
- Producer topics map naturally to job names.
- Persistent topics keep messages until they are acknowledged once a consumer/subscription exists.
- Cache producers by topic/job instead of creating a producer for every request.
- Serialize message payloads as JSON buffers.
- Deserialize messages inside a shared consumer wrapper before calling job-specific logic.
- Use a shared subscription so all executor replicas consume from the same backlog in round-robin style.
- Acknowledge after processing.
- Add explicit retry/dead-letter behavior later rather than only relying on final ack behavior.

## Job Lifecycle

1. Discover job templates at startup.
2. Client queries available jobs.
3. Client calls `executeJob(name, data)`.
4. Jobs validates auth through Auth gRPC.
5. Jobs validates job payload against the job message class.
6. Jobs persists the job execution if it is trackable.
7. Jobs publishes one or many Pulsar messages.
8. Executor consumes each message.
9. Executor deserializes and runs job logic.
10. Executor acknowledges the Pulsar message.
11. Executor reports completed units to Jobs over gRPC.
12. Jobs updates status and completion count.

## Job Status Persistence

- Jobs service gets its own database and `jobs` table.
- Job fields:
  - id
  - name
  - size
  - completed
  - status
  - started
  - ended
- On job creation:
  - persist the job before producing messages
  - `size` is array length for batch jobs
  - `completed` starts at 0
  - status starts as in progress
- Every produced message includes `jobId`.
- Acknowledge increments `completed`.
- When `completed === size`, mark job completed and set `ended`.
- Abstract consumer pattern:
  - job-specific handler does real work
  - shared consumer layer handles acknowledgement/status reporting
  - new jobs inherit tracking automatically

## Dashboard And API Implications

- Keep available job definitions separate from persisted job executions.
- `executeJob` should return the persisted job, especially the id.
- Add queries:
  - all persisted jobs
  - one job by id
- Dashboard should show:
  - job id
  - name
  - size
  - completed count
  - status
  - started
  - ended
  - progress percentage
  - elapsed duration

## Gems To Preserve

- Job registry with decorators/discovery.
- Public GraphQL plus internal gRPC.
- Pulsar shared subscriptions for horizontal scaling.
- One message per product for fan-out processing.
- Fire-and-poll job execution, not request-blocking execution.
- Persisted job status with `size` and `completed`.
- Abstract consumer layer that handles acknowledgement/status once for all jobs.
- Structured logs before Kubernetes deployment.
- Minikube before AWS.
