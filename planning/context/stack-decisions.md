# Stack Decisions

## Adopted Stack

- Language: TypeScript
- Runtime: Node.js
- Backend framework: NestJS
- Repo structure: Nx monorepo
- API layer: GraphQL
- Auth: JWT with HTTP-only cookies
- Internal communication: gRPC
- Database: PostgreSQL
- ORM: Drizzle ORM
- Message broker/job execution: Apache Pulsar
- Workers/consumers: NestJS worker/consumer services
- File input: uploaded `products.json` file, matching the course workload first
- Logging: Pino
- Containers: Docker
- Local orchestration/deployment: Kubernetes with Minikube and Helm
- CI/CD: GitHub Actions
- Cloud deployment: AWS later
- Tiny frontend: admin dashboard for job list, detail, progress, results, and demo screenshots

## Non-Negotiable Course Alignment

- Use GraphQL for public API.
- Use gRPC for internal service communication.
- Use Apache Pulsar for job distribution.
- Use Drizzle for Dispatch database work.
- Use Products JSON import as the first real workload.
- Use executor replicas as the main scaling demonstration.

## Key Decisions

- Use `Dispatch` because it directly describes receiving work, assigning it, tracking it, and getting it done.
- Keep the first build course-aligned.
- Use the product catalog import workload first.
- Build a tiny dashboard only after the backend flow works.

## Build System

- Split the Nx monorepo into npm workspaces so each app/library owns its own `package.json`.
- Keep only truly shared dependencies at the repo root.
- Use workspace roots:
  - `apps/*`
  - `libs/*`
- Move dependency-heavy shared domains into libraries:
  - GraphQL
  - gRPC
  - Pulsar
  - database/ORM
- Keep lightweight Nest bootstrap code separate so services can import it without pulling GraphQL or other heavy dependencies.
- Put domain build tasks beside the owning library. Example: proto generation belongs to the gRPC library target.
- TS path aliases are not enough for compiled Node runtime. Either register runtime aliases or avoid aliases in emitted code.

## Database And Migrations

- Use PostgreSQL for service persistence.
- Use Drizzle ORM and Drizzle Kit for schemas and migrations.
- Runtime images that run migrations need migration files and migration tooling available.
- Run migrations before app startup using init containers.
- Init containers are useful because app containers do not start against stale schemas if migrations fail.
