# Project Brief

## Project

Name:

- `Dispatch`

Title:

- `Dispatch: Distributed Job Processing Engine`

Short description:

- Dispatch accepts heavy work, fans it out into messages, runs it through background executors, tracks progress, and shows final results.

## Course Basis

The course teaches how to build a distributed NestJS microservices system by creating a job engine from the ground up.

The project uses:

- Nx monorepo
- NestJS microservices
- GraphQL API
- JWT authentication with HTTP-only cookies
- gRPC service-to-service communication
- Apache Pulsar for distributed job processing
- PostgreSQL with Drizzle
- Docker
- Kubernetes
- AWS deployment
- Custom domain and SSL

## CV Angle

> Built a distributed NestJS job processing engine using GraphQL, gRPC, Apache Pulsar, PostgreSQL, Drizzle, Docker, and Kubernetes; implemented product import fan-out, background executors, persisted job status, acknowledgements, structured logging, and horizontal scaling.

Positioning rules:

- Do not sell this as "watched a Udemy course."
- Sell the project, repo, architecture docs, scaling proof, and demo screenshots.
- Treat the Udemy certificate as a small supporting signal, not the proof.

## Audience

- Backend developers who want to scale Node.js systems.
- Developers who want to learn NestJS microservices.
- Engineers interested in gRPC and Apache Pulsar.
- Engineers interested in Drizzle, Docker, GraphQL, Kubernetes, and AWS.

## Scope Guardrails

- Do not add BullMQ/Redis for the core course-aligned version.
- Do not build a no-code workflow builder.
- Do not overbuild the dashboard before the backend engine works.
- Do not make Products a fake JSON-only demo; persist/enrich products through Products service.
