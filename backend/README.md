# Todo REST API

A simple, beginner-friendly REST API built with Express and TypeScript using modern Node.js features (2025).

## Features

- **Native ESM** (ECMAScript Modules) for modern syntax
- **Experimental TypeScript Stripping** - Run `.ts` files directly without transpilation
- **Built-in File Watching** - No need for nodemon
- **Type-safe** - Full TypeScript support with Zod validation
- **In-memory storage** - Simple array-based storage for learning purposes

## Prerequisites

- Node.js v20+ (for experimental TypeScript support)

## Installation

```bash
npm install
```

## Running the API

### Development mode (with hot reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### Create a Todo
**POST** `/todos`

Request body:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

### Get All Todos
**GET** `/todos`

### Get Single Todo
**GET** `/todos/:id`

### Update a Todo
**PUT** `/todos/:id`

Request body (all fields optional):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Delete a Todo
**DELETE** `/todos/:id`

## Project Structure

```
backend/
├── src/
│   ├── index.ts       # Main Express app with all endpoints
│   └── types.ts       # TypeScript types and Zod schemas
├── package.json
├── tsconfig.json
└── README.md
```

## Type Safety

All inputs are validated using Zod schemas:
- `title` - Required, non-empty string
- `description` - Optional string
- `completed` - Boolean (defaults to false)

Each Todo includes:
- `id` - Auto-generated UUID
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo","completed":false}'

# Get all todos
curl http://localhost:3000/todos

# Get single todo
curl http://localhost:3000/todos/{id}

# Update todo
curl -X PUT http://localhost:3000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/todos/{id}
```

## Modern Node.js Features Used

- `--experimental-strip-types` - Run TypeScript natively
- `--watch` - Built-in file watching
- Native ESM with explicit `.ts` extensions in imports
- No build step required for development
