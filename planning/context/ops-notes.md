# Ops Notes

## Docker

- Use per-service multi-stage Dockerfiles.
- Builder stage:
  - install dependencies needed for that app/libs
  - build the app
- Runner stage:
  - install production dependencies
  - copy compiled `dist`
  - copy required generated clients/assets
- Build context can be repo root, but copy steps should stay narrow: one app plus only its required libraries.
- Install OS packages explicitly:
  - `protobuf-compiler` for proto generation
  - OpenSSL if the selected ORM/client needs it
- Use `NODE_ENV=production` in runtime images.
- Add `.dockerignore` for heavy local artifacts like `node_modules` and `dist`.
- Centralize common webpack config once apps/libs multiply.

## Logging

- Add structured logging before Kubernetes debugging becomes painful.
- Use Pino/Nest Pino style logs for request context and correlation.
- Production logs should be machine-readable.
- Dev logs can be prettier and more verbose.
- GraphQL needs explicit operation logging:
  - operation name
  - variables when safe
  - status
  - duration
  - request id
- gRPC needs an interceptor for request/response timing and handler context.
- Redact sensitive fields. Do not log tokens/session data.

## CI/CD

- Build and push service images from CI after lint/test/build checks.
- Use one registry image per service.
- CI can loop over service/Dockerfile pairs.
- Prefer GitHub OIDC/IAM role federation for AWS instead of long-lived AWS access keys.

## Kubernetes And Helm

- Use Minikube first for local Kubernetes parity before AWS.
- Keep Helm chart inside the monorepo under `charts/`.
- Start from `helm create`, delete default templates, then add service templates.
- Organize Helm templates by microservice folder.
- Gate each service behind an `enabled` value for independent deployability.
- Deployment values should include:
  - image
  - replicas
  - pull policy
  - ports
- Replicas become the horizontal scaling lever.
- Add local Helm dependencies for Pulsar and Postgres.
- Override local dependency values to reduce replicas and disable heavy monitoring.
- Use Kubernetes services, not pod IPs, for internal networking.
- Auth needs separate HTTP and gRPC services.
- Executor may not need a Kubernetes service if it only consumes from Pulsar.
- Use shared Helm helpers for repeated env vars like Pulsar URL and database URLs.
- Quote large numeric env values in Helm values to avoid YAML/Kubernetes conversion issues.
- Local values may contain throwaway secrets, but real deployment should use Secret/ExternalSecret flow.

## Local Testing Flow

1. Deploy Helm chart.
2. Wait for pods.
3. Inspect pod logs and environment.
4. Expose ClusterIP services locally with Minikube.
5. Create user in Auth.
6. Login and confirm auth cookie.
7. Query available jobs.
8. Execute a job.
9. Inspect executor logs and Pulsar topic stats.

## Load Testing

- Fibonacci is the course's early synthetic load job.
- One GraphQL mutation creates many Pulsar messages.
- Executor consumes them asynchronously.
- Load scripts should accept URLs and message count as CLI args.
- Pulsar topic stats are the useful signal:
  - backlog
  - subscription state
  - ack rate
- Ack rate matters because messages are acknowledged only after processing.
- Scaling executor replicas should drain backlog faster through the shared subscription.

## Production And AWS

- Add Docker/ECR support for Products.
- Update executor image to include gRPC dependencies.
- Helm adds:
  - Products deployment
  - Products service
  - service-specific database URLs
  - init containers for migrations
  - Postgres setup for auth/products/jobs databases
- Ingress consolidates public Auth and Jobs endpoints under one host.
- AWS path:
  - EKS
  - AWS Load Balancer Controller
  - EBS CSI driver
  - Helm AWS values override
  - Route 53 domain
  - ACM certificate
  - ALB HTTPS annotations
  - SSL redirect
  - secure auth cookies

## Scaling

- Scale executor pods first.
- Do not scale Jobs API just to process more background work.
- More executor replicas means more Pulsar shared-subscription consumers.
- This drains the same product backlog faster.
- Database can become the next bottleneck; measure DB saturation when scaling workers.

## Debugging

- Enable Webpack source maps for apps/libs.
- Assign unique Node inspect ports per service.
- Debugging multiple services helps trace:
  - GraphQL resolver
  - auth guard
  - Auth gRPC
  - Jobs resolver
  - Executor consumer
  - Products gRPC
