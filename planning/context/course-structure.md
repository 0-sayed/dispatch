# Course Structure

Course:

**NestJS Microservices: Build a Distributed Job Engine**

Source links:

- Udemy: https://www.udemy.com/course/nestjs-microservices-build-a-distributed-job-engine/
- Instructor curriculum page: https://michaelguay.dev/courses/nestjs-microservices-build-a-distributed-job-manager/

Derived local context:

- `planning/context/project-brief.md`
- `planning/context/stack-decisions.md`
- `planning/context/architecture-notes.md`
- `planning/context/product-import-notes.md`
- `planning/context/ops-notes.md`
- `planning/roadmap/tasks.md`

## Course Info

- Instructor: Michael Guay
- Category: Development / Web Development / NestJS
- Language: English
- Last updated on Udemy: March 2026
- Udemy rating at fetch time: 4.5 / 5
- Udemy students at fetch time: 1,378
- Udemy course size: 17 sections, 111 lectures, 15h 25m total length
- Class Central lists the course as intermediate, self-paced, with certificate available.

## Course Description

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

The main learning outcome is a production-style distributed job engine with state tracking, scalable services, containerization, and cloud deployment.

## Stack

Course stack:

- Language: TypeScript
- Runtime: Node.js
- Backend framework: NestJS
- Repo structure: Nx monorepo
- API layer: GraphQL
- Auth: JWT with HTTP-only cookies
- Internal communication: gRPC
- Messaging/job execution: Apache Pulsar
- Database: PostgreSQL
- ORM/tools: Drizzle
- Logging: Pino
- Containers: Docker
- Local orchestration/deployment: Kubernetes with Minikube and Helm
- Cloud deployment: AWS
- AWS pieces mentioned in curriculum: ECR, EKS, load balancer controller, CSI driver
- CI/CD: GitHub Actions
- Production edge: Ingress, custom domain, SSL

Dispatch stack we will adopt:

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

## What The Course Claims You Will Learn

- Build a distributed job engine using NestJS microservices
- Structure a scalable Nx monorepo
- Use gRPC for low-latency internal service communication
- Use Apache Pulsar for reliable distributed messaging/job processing
- Expose a GraphQL API
- Secure services with JWT and HTTP-only cookies
- Apply object-oriented design for modular code
- Horizontally scale services for higher workloads
- Optimize Docker builds with Nx libraries and independent package files
- Use Drizzle ORM with PostgreSQL
- Deploy microservices to Kubernetes
- Set up AWS production deployment with domain and SSL

## Requirements

- Basic JavaScript or TypeScript
- Node.js and backend concepts
- REST API understanding
- Some PostgreSQL/database experience
- Basic Docker/container knowledge
- Basic NestJS knowledge
- Kubernetes familiarity for deployment sections

## Who It Is For

- Backend developers who want to scale Node.js systems
- Developers who want to learn NestJS microservices
- Engineers interested in gRPC and Apache Pulsar
- Developers who want a real production-grade NestJS project
- Engineers interested in Drizzle, Docker, GraphQL, Kubernetes, and AWS

## Curriculum Tree

```text
NestJS Microservices: Build a Distributed Job Engine
├── 01. Introduction
│   ├── Introduction
│   ├── System Architecture
│   ├── Prerequisites
│   ├── Resources
│   ├── GitHub Repository
│   ├── Nx Bug
│   ├── Nx Monorepo Setup - Part 1
│   ├── Nx Monorepo Setup - Part 2
│   ├── GitHub Actions CI
│   └── Course Updates / Updates
│
├── 02. Users
│   ├── Database Schema
│   ├── Nx Database Targets
│   ├── GraphQL & Nx Libs - Part 1
│   ├── GraphQL & Nx Libs - Part 2
│   └── Users Mutation & Query
│
├── 03. Cleanup / Extra
│   ├── Commit Hooks
│   ├── Unit Tests
│   ├── Config Module
│   └── Nx Options
│
├── 04. Authentication
│   ├── NestJS Generators
│   ├── JWT Module
│   ├── Config Cleanup
│   ├── User Verification
│   ├── JWT Expiration
│   ├── Sign JWT Cookie
│   ├── JWT Strategy
│   ├── User Parameter Decorator
│   └── Auth Playground Settings
│
├── 05. Jobs
│   ├── Generate Application
│   ├── Job Decorator
│   ├── Discovery Module
│   ├── Jobs Resolver
│   └── Jobs Playground Settings
│
├── 06. gRPC Transport
│   ├── Auth Proto
│   ├── TS Proto
│   ├── gRPC Server
│   ├── Auth Controller & Client
│   ├── gRPC GQL Auth Guard
│   └── gRPC Auth Strategy
│
├── 07. Pulsar Job Executor
│   ├── Pulsar Client
│   ├── Abstract Job Producer
│   ├── Abstract Consumer
│   ├── Job Executor
│   ├── JSON GraphQL Scalar
│   ├── Message Serialization & Error Handling
│   └── Job Validation
│
├── 08. Message Batching
│   ├── Pulsar Batch Producer
│   └── Backlog Test Script
│
├── 09. Dockerization
│   ├── NPM Workspaces
│   ├── New Libraries
│   ├── Library Dependencies
│   ├── Library Webpack
│   ├── Update Applications
│   ├── Module Alias
│   ├── Jobs Dockerfile
│   ├── Finish Dockerfiles
│   └── Common Webpack
│
├── 10. Logging
│   ├── Pino Logger
│   ├── GraphQL Logger
│   └── gRPC Logger
│
├── 11. Kubernetes
│   ├── Elastic Container Registry
│   ├── GitHub Action ECR
│   ├── Minikube
│   ├── Update Prettier
│   ├── Create Helm Chart
│   ├── Jobs Deployment
│   ├── Registry Creds Addon
│   ├── Pulsar & Postgres
│   ├── Environment Variables
│   ├── Database Runtime Image Fixes
│   ├── Executor & Auth Deployment
│   ├── Auth gRPC URL
│   ├── Services
│   ├── Minikube Service
│   ├── Database Migrations
│   └── Job Execution
│
├── 12. Horizontal Scaling
│   ├── Fibonacci Script
│   └── Horizontal Scaling
│
├── 13. Products
│   ├── File Upload
│   ├── Products Service
│   ├── Drizzle ORM
│   ├── Drizzle Kit Migrations
│   ├── Products Proto
│   ├── Products gRPC
│   ├── Load Products Job
│   ├── Job File Data
│   ├── Load Products Consumer
│   ├── Products gRPC Client
│   ├── Categories
│   ├── Products Dockerfile
│   ├── Products Helm
│   ├── Products Helm Testing
│   └── Jobs Volume
│
├── 14. Job Status
│   ├── Jobs Drizzle Schema
│   ├── Save Job
│   ├── Job Acknowledge
│   ├── Executor Acknowledge
│   ├── Acknowledge Testing
│   ├── Jobs Dockerfile Database Setup
│   ├── Acknowledge Helm
│   └── Job Status Resolver
│
├── 15. Production
│   ├── Ingress
│   ├── AWS CLI
│   ├── Elastic Kubernetes Service
│   ├── LB Controller & CSI Driver
│   ├── AWS Helm Chart - Part 1
│   ├── AWS Helm Chart - Part 2
│   ├── Horizontal Scaling
│   └── Custom Domain & SSL
│
├── 16. Extra
│   └── Debugging
│
└── 17. Updates
    └── ORM, GraphQL, & More
```

## Roadmap-Relevant Signals

Strong topics to preserve in our Dispatch roadmap:

- Job lifecycle: create, enqueue, execute, acknowledge, track status
- User/auth foundation
- Internal service communication
- Message producer/consumer architecture
- Payload serialization and validation
- Error handling
- Batch processing
- Logging
- Dockerization
- Kubernetes/deployment awareness
- Horizontal scaling
- File upload based job input
- Persistent job status in PostgreSQL

Topics to adapt instead of copy directly:

- Keep GraphQL, Apache Pulsar, gRPC, Docker, Kubernetes, and the product import workload close to the course instead of drifting into a different stack.
- Use Drizzle ORM for Dispatch as the main database layer because it keeps schema/query work in TypeScript, stays closer to SQL, and gives stronger PostgreSQL/interview signal for a backend-heavy project.
- Keep AWS deployment as a later proof step if MVP time becomes tight.

## Confirmed Product Workload

The course's Products section is a bulk product catalog import workload.

Confirmed public evidence:

- The `File Upload` lesson publicly links a resource named `Products JSON`.
- The linked zip is `products.json_.zip`.
- The zip contains `products.json`.
- `products.json` contains 100,000 product records.
- Each product record has:
  - `name`
  - `category`
  - `price`
  - `stock`
  - `rating`
  - `description`
- Observed categories:
  - Apparel
  - Electronics
  - Furniture
  - Grocery
  - Home & Kitchen
  - Sports & Outdoors

Example product:

```json
{
  "name": "Yoga Mat",
  "category": "Sports & Outdoors",
  "price": 110.53,
  "stock": 220,
  "rating": 4,
  "description": "Non-slip yoga mat with extra cushioning for comfort during workouts."
}
```

Business use case:

```text
Bulk product catalog import for an ecommerce/inventory system.

User uploads products.json
-> Jobs service creates a load-products job
-> Pulsar delivers the job to a consumer
-> Consumer reads the uploaded file data
-> Products service persists products/categories with Drizzle + PostgreSQL
-> Job status is updated
```

## Notes For Dispatch

The course project builds a distributed job engine using a products/file-upload workload. For our CV project, the course-aligned version is:

```text
Dispatch
├── GraphQL job API
├── Product JSON import job
├── Apache Pulsar producer/consumer flow
├── Products gRPC service
├── PostgreSQL job/product registry
├── Drizzle ORM schema and migrations
├── Worker/consumer service
├── Progress/log/audit trail
└── Tiny admin dashboard
```

This keeps the build focused on the course-backed product import workload.
