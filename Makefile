.PHONY: help setup infra infra-down health check validate test build db-migrate

help:
	@printf '%s\n' 'Dispatch developer commands:'
	@printf '%s\n' '  make setup       Install dependencies'
	@printf '%s\n' '  make infra       Start local Postgres and Pulsar'
	@printf '%s\n' '  make infra-down  Stop local backing services'
	@printf '%s\n' '  make health      Check local HTTP service health endpoints'
	@printf '%s\n' '  make check       Run fast local checks'
	@printf '%s\n' '  make validate    Run full PR gate'
	@printf '%s\n' '  make test        Run all tests'
	@printf '%s\n' '  make build       Build all apps and libs'
	@printf '%s\n' '  make db-migrate  Run Drizzle migrations'

setup:
	pnpm install

infra:
	pnpm infra:up

infra-down:
	pnpm infra:down

health:
	@curl -fsS "http://localhost:$${AUTH_PORT:-3001}/health" >/dev/null
	@curl -fsS "http://localhost:$${JOBS_PORT:-3002}/health" >/dev/null
	@curl -fsS "http://localhost:$${PRODUCTS_PORT:-3003}/health" >/dev/null
	@printf '%s\n' 'Local HTTP services are healthy.'

check:
	pnpm lint
	pnpm typecheck
	pnpm test:unit

validate:
	pnpm validate

test:
	pnpm test

build:
	pnpm build

db-migrate:
	pnpm db:migrate
