# Dispatch Tasks

This file tracks PR-sized implementation order. Each row is intended to be one PR.

## Rules

- `Done` is manually checked when the PR/task is finished.
- `Depends On` lists direct blockers only.
- `Context` lists the seed context files to read before planning that task.
- Keep detailed implementation plans temporary; generate them when a task starts.
- Do not add specs/evals folders unless the workflow changes later.

## Context Names

- `project-brief` -> `planning/context/project-brief.md`
- `course-structure` -> `planning/context/course-structure.md`
- `stack-decisions` -> `planning/context/stack-decisions.md`
- `architecture-notes` -> `planning/context/architecture-notes.md`
- `product-import-notes` -> `planning/context/product-import-notes.md`
- `ops-notes` -> `planning/context/ops-notes.md`
- `raw-sources` -> `planning/context/raw-sources.md` (provenance only; not normal task context)

## Tasks

| Done | ID   | PR Task                                                                                                   | Depends On             | Context                                                              |
| ---- | ---- | --------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------- |
|      |      | **Course 01-03: Introduction, Nx setup, CI, cleanup**                                                     |                        |                                                                      |
| [ ]  | T001 | Scaffold Nx monorepo with `auth`, `jobs`, `executor`, `products` apps and baseline TypeScript/Nest config | -                      | project-brief, course-structure, stack-decisions                     |
| [ ]  | T002 | Add shared workspace layout for `apps/*`, `libs/*`, service env files, and common bootstrap library       | T001                   | course-structure, stack-decisions, architecture-notes                |
| [ ]  | T003 | Add baseline CI workflow for lint, tests, and build                                                       | T002                   | ops-notes, stack-decisions                                           |
| [ ]  | T004 | Add local dev runtime for Postgres, Pulsar, service envs, and health checks                               | T002                   | stack-decisions, architecture-notes, ops-notes                       |
|      |      | **Course 02-04: Users and Authentication**                                                                |                        |                                                                      |
| [ ]  | T005 | Add GraphQL shared library and wire Auth GraphQL server baseline                                          | T002                   | course-structure, stack-decisions, architecture-notes                |
| [ ]  | T006 | Add Auth database schema/migrations for users with Drizzle/PostgreSQL                                     | T002, T004             | stack-decisions, architecture-notes                                  |
| [ ]  | T007 | Implement Auth create-user and login mutations with HTTP-only JWT cookie                                  | T005, T006             | architecture-notes                                                   |
|      |      | **Course 06: gRPC Transport**                                                                             |                        |                                                                      |
| [ ]  | T008 | Add shared gRPC/proto generation library and build target                                                 | T002                   | course-structure, stack-decisions, architecture-notes                |
| [ ]  | T009 | Implement Auth gRPC token verification service                                                            | T007, T008             | architecture-notes                                                   |
| [ ]  | T010 | Wire Jobs GraphQL API with gRPC auth guard and current-user context                                       | T005, T009             | architecture-notes                                                   |
|      |      | **Course 05, 07-08: Jobs, Pulsar executor, message batching**                                             |                        |                                                                      |
| [ ]  | T011 | Add Jobs app job decorator, discovery registry, and available `jobs` query                                | T010                   | architecture-notes                                                   |
| [ ]  | T012 | Add JSON payload scalar and runtime job payload validation                                                | T011                   | architecture-notes                                                   |
| [ ]  | T013 | Implement `executeJob` mutation returning accepted job execution metadata                                 | T012                   | architecture-notes                                                   |
| [ ]  | T014 | Add shared Pulsar client library with producer caching and lifecycle cleanup                              | T002, T004             | stack-decisions, architecture-notes                                  |
| [ ]  | T015 | Add abstract producer/consumer message serialization layer                                                | T014                   | architecture-notes                                                   |
| [ ]  | T016 | Implement early synthetic load job through Jobs producer and Executor consumer                            | T013, T015             | architecture-notes, ops-notes                                        |
| [ ]  | T017 | Add backlog/load script for synthetic job throughput checks                                               | T016                   | ops-notes                                                            |
|      |      | **Course 10: Logging**                                                                                    |                        |                                                                      |
| [ ]  | T018 | Add Pino structured logging, GraphQL operation logging, and gRPC interceptor logging                      | T010, T016             | ops-notes, architecture-notes                                        |
|      |      | **Course 13: Products**                                                                                   |                        |                                                                      |
| [ ]  | T019 | Add Products service Drizzle schema, migrations, categories, and product enrichment insert flow           | T002, T004             | product-import-notes, stack-decisions                                |
| [ ]  | T020 | Add Products gRPC `createProduct` contract and server implementation                                      | T008, T019             | product-import-notes, architecture-notes                             |
| [ ]  | T021 | Add Jobs file upload endpoint for `products.json` and persisted upload reference                          | T013                   | product-import-notes                                                 |
| [ ]  | T022 | Add Jobs database schema for persisted job executions and status fields                                   | T002, T004             | product-import-notes, stack-decisions, architecture-notes            |
| [ ]  | T023 | Change `executeJob` to persist job execution before producing batch messages                              | T013, T022             | product-import-notes, architecture-notes                             |
| [ ]  | T024 | Implement `load products` job fan-out from uploaded JSON file to one Pulsar message per product           | T021, T023, T015       | product-import-notes                                                 |
| [ ]  | T025 | Implement Executor `load products` consumer calling Products gRPC                                         | T020, T024             | product-import-notes, architecture-notes                             |
|      |      | **Course 14: Job Status**                                                                                 |                        |                                                                      |
| [ ]  | T026 | Add Jobs gRPC `acknowledge(jobId)` and status completion updates                                          | T008, T022             | product-import-notes, architecture-notes                             |
| [ ]  | T027 | Move executor acknowledgement/status reporting into shared consumer flow                                  | T025, T026             | product-import-notes, architecture-notes                             |
| [ ]  | T028 | Add persisted job list/detail GraphQL queries with progress fields                                        | T023, T027             | product-import-notes, architecture-notes                             |
| [ ]  | T029 | Add tiny dashboard for job list/detail/progress and demo screenshots                                      | T028                   | project-brief, product-import-notes, architecture-notes              |
|      |      | **Course 09, 11: Dockerization and Kubernetes**                                                           |                        |                                                                      |
| [ ]  | T030 | Add per-service Dockerfiles and `.dockerignore` with narrow build/runtime copies                          | T016, T020, T026       | ops-notes, stack-decisions                                           |
| [ ]  | T031 | Add Helm chart skeleton with local Pulsar/Postgres dependencies and shared values helpers                 | T030                   | ops-notes                                                            |
| [ ]  | T032 | Add Kubernetes deployments/services for Auth, Jobs, Products, and Executor                                | T031                   | ops-notes, architecture-notes                                        |
| [ ]  | T033 | Add Drizzle migration init containers for Auth, Jobs, and Products                                        | T032, T006, T019, T022 | ops-notes, stack-decisions, architecture-notes, product-import-notes |
| [ ]  | T034 | Add Minikube smoke flow for auth, job discovery, product import, and status polling                       | T033, T028             | ops-notes, product-import-notes, architecture-notes                  |
|      |      | **Course 12: Horizontal Scaling**                                                                         |                        |                                                                      |
| [ ]  | T035 | Capture scaling proof comparing one vs multiple executor replicas on product import                       | T034                   | ops-notes, product-import-notes                                      |
|      |      | **Course 15: Production**                                                                                 |                        |                                                                      |
| [ ]  | T036 | Add service image publishing workflow for registry/ECR                                                    | T003, T030             | ops-notes                                                            |
| [ ]  | T037 | Add AWS EKS production Helm values for service images, databases, and runtime env                         | T032, T036             | ops-notes, architecture-notes                                        |
| [ ]  | T038 | Add AWS ingress, load balancer, HTTPS, and domain configuration                                           | T037                   | ops-notes, architecture-notes                                        |
| [ ]  | T039 | Add production cookie/security config for AWS HTTPS deployment                                            | T007, T038             | ops-notes, architecture-notes                                        |
