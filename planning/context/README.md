# Dispatch Context

This folder contains seed context only. It is not an implementation plan.

Use `planning/roadmap/tasks.md` to choose the next PR task, then read only the context files listed in that task's `Context` column.

## Files

- `project-brief.md` - what Dispatch is, why it exists, CV positioning, scope guardrails.
- `course-structure.md` - course metadata, curriculum tree, and workload evidence.
- `stack-decisions.md` - adopted stack and non-negotiable course alignment.
- `architecture-notes.md` - service split, GraphQL, auth, gRPC, Pulsar, job lifecycle, status flow.
- `product-import-notes.md` - `products.json` workload, file upload, Products service, Drizzle schema, fan-out flow.
- `ops-notes.md` - Docker, logging, CI/CD, Kubernetes, local testing, scaling, AWS later.
- `raw-sources.md` - provenance, source links, transcript ranges, and dataset origin notes.

## Rule

Do not feed the whole `planning/context/` folder by default. Start from `planning/roadmap/tasks.md`, pick a task, then load only the context names listed for that task.
