# Product Import Notes

## Product Import Use Case

Build `load products` as the first realistic Dispatch workload.

Flow:

```text
User uploads products.json
-> Jobs service creates a load-products job
-> Jobs service emits one Pulsar message per product
-> Executor consumes product messages
-> Executor calls Products gRPC createProduct
-> Products service persists/enriches products/categories with Drizzle + PostgreSQL
-> Executor acknowledges message and reports completed unit to Jobs
-> Job status is updated
```

This is stronger than a fake job because it shows:

- file upload
- large input handling
- message fan-out
- domain service call
- database writes
- status tracking
- horizontal scaling

## Dataset

Dataset facts:

- 100,000 product records
- about 19 MB
- fields:
  - `name`
  - `category`
  - `price`
  - `stock`
  - `rating`
  - `description`
- observed categories:
  - Apparel
  - Electronics
  - Furniture
  - Grocery
  - Home & Kitchen
  - Sports & Outdoors

The full dataset is intentionally not stored in this planning folder. Add a small fixture later when implementation needs it.

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

## File Upload

- Runtime upload happens through a jobs endpoint using multipart form data.
- Upload response returns a stored filename.
- That filename becomes the handle used when executing the job.
- Local upload storage starts on disk under Jobs.
- Kubernetes needs persistence beyond pod lifetime.
- Minikube can use a shared local volume.
- AWS EBS is more restrictive for shared writes, so object storage would be cleaner for a real production variant.
- Treat the course dataset as uploaded/sample input, not a hardcoded app dependency.

## Products Service And Drizzle

- Add a dedicated Products microservice with its own database/config.
- Product fields:
  - id
  - name
  - category
  - price
  - stock
  - rating
  - description
- Use Drizzle ORM with PostgreSQL.
- Use a typed schema registry and Postgres connection pool.
- Drizzle Kit flow:
  - schema path
  - migration output folder
  - Postgres dialect
  - DB URL
  - generate SQL migrations
  - migrate
- Add `categories` table:
  - unique category name
  - category charge
- Product enrichment:
  - look up category
  - adjust product price using category charge
  - insert product

## Load Products Job

- Define shared message types in a common library.
- `LoadProductsMessage` validates:
  - name
  - category
  - description
  - nonnegative price
  - nonnegative stock
  - integer stock
  - rating from 0 to 5
- Add shared job/topic names, including `load products`.
- For a file-backed job:
  - read uploaded JSON array
  - create a persisted job row
  - publish one Pulsar message per product
  - attach `jobId` to each message
- Do not keep the API waiting until every broker send is acknowledged.
- Return the created job and let the client poll status.
- Configure producer backpressure so very large sends block rather than crash when the producer queue is full.

## Executor Flow

1. Executor subscribes to `load products`.
2. Executor receives one product per message.
3. Executor validates/deserializes message.
4. Executor calls Products gRPC `createProduct`.
5. Executor acknowledges the Pulsar message.
6. Executor calls Jobs gRPC `acknowledge(jobId)`.
7. Jobs updates completion count/status.
