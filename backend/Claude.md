Overview
Build an Express REST API in TypeScript that implements CRUD operations for a Todo resource. Each endpoint should follow best practices for RESTful APIs and leverage TypeScript throughout to ensure type safety and schema validation.

Requirements

Use Express.js as the web framework.
Implement endpoints for:
Create (POST /todos)
Read single (GET /todos/:id)
Read all (GET /todos)
Update (PUT /todos/:id)
Delete (DELETE /todos/:id)
All data types, payloads, and responses should be strictly typed using TypeScript interfaces or types.
Include input validation based on TypeScript types/schemas (using Zod ).
Store todos in either an in-memory array, a file, or a lightweight DB as appropriate.
Acceptance Criteria

All routes listed above are implemented and documented.
All logic and data flow is type-safe and validated.
There are clear instructions for running the API locally in the README.

