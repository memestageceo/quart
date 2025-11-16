import express from 'express';
import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { todoSchema, todoUpdateSchema, type Todo, type TodoInput, type TodoUpdate } from './todos/todo.types.ts';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

/**
 * In-memory storage for todos.
 * This is a simple array that stores all todo items.
 * In a production environment, this would be replaced with a database.
 * @type {Todo[]}
 */
let todos: Todo[] = [];

/**
 * Finds a todo item by its unique identifier.
 * @param {string} id - The unique identifier of the todo to find
 * @returns {Todo | undefined} The todo object if found, undefined otherwise
 */
const findTodoById = (id: string): Todo | undefined => {
  return todos.find(todo => todo.id === id);
};

/**
 * CREATE - POST /todos
 * Creates a new todo item with the provided data.
 * 
 * @route POST /todos
 * @param {TodoInput} req.body - The todo data (title and optional description)
 * @returns {Todo} 201 - The newly created todo object with id, timestamps
 * @returns {Object} 400 - Validation error with details if input is invalid
 * 
 * @example
 * // Request body
 * {
 *   "title": "Learn TypeScript",
 *   "description": "Complete the TypeScript tutorial"
 * }
 * 
 * // Response (201)
 * {
 *   "id": "uuid-string",
 *   "title": "Learn TypeScript",
 *   "description": "Complete the TypeScript tutorial",
 *   "completed": false,
 *   "createdAt": "2025-11-15T10:30:00.000Z",
 *   "updatedAt": "2025-11-15T10:30:00.000Z"
 * }
 */
app.post('/todos', (req: Request, res: Response): void => {
  try {
    // Validate input with Zod
    const validatedData: TodoInput = todoSchema.parse(req.body);

    const newTodo: Todo = {
      id: randomUUID(),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Validation failed', details: error.message });
    } else {
      res.status(400).json({ error: 'Validation failed' });
    }
  }
});

/**
 * READ ALL - GET /todos
 * Retrieves all todo items from storage.
 * 
 * @route GET /todos
 * @returns {Todo[]} 200 - Array of all todo objects
 * 
 * @example
 * // Response (200)
 * [
 *   {
 *     "id": "uuid-1",
 *     "title": "Learn TypeScript",
 *     "description": "Complete the TypeScript tutorial",
 *     "completed": false,
 *     "createdAt": "2025-11-15T10:30:00.000Z",
 *     "updatedAt": "2025-11-15T10:30:00.000Z"
 *   }
 * ]
 */
app.get('/todos', (_req: Request, res: Response): void => {
  res.json(todos);
});

/**
 * READ SINGLE - GET /todos/:id
 * Retrieves a single todo item by its unique identifier.
 * 
 * @route GET /todos/:id
 * @param {string} id - The unique identifier of the todo to retrieve
 * @returns {Todo} 200 - The requested todo object
 * @returns {Object} 404 - Error message if todo is not found
 * 
 * @example
 * // Response (200)
 * {
 *   "id": "uuid-1",
 *   "title": "Learn TypeScript",
 *   "description": "Complete the TypeScript tutorial",
 *   "completed": false,
 *   "createdAt": "2025-11-15T10:30:00.000Z",
 *   "updatedAt": "2025-11-15T10:30:00.000Z"
 * }
 */
app.get('/todos/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const todo = findTodoById(id);

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  res.json(todo);
});

/**
 * UPDATE - PUT /todos/:id
 * Updates an existing todo item with the provided data.
 * Only the fields provided in the request body will be updated.
 * The updatedAt timestamp is automatically set to the current time.
 * 
 * @route PUT /todos/:id
 * @param {string} id - The unique identifier of the todo to update
 * @param {TodoUpdate} req.body - The fields to update (title, description, or completed)
 * @returns {Todo} 200 - The updated todo object
 * @returns {Object} 404 - Error message if todo is not found
 * @returns {Object} 400 - Validation error with details if input is invalid
 * 
 * @example
 * // Request body
 * {
 *   "completed": true
 * }
 * 
 * // Response (200)
 * {
 *   "id": "uuid-1",
 *   "title": "Learn TypeScript",
 *   "description": "Complete the TypeScript tutorial",
 *   "completed": true,
 *   "createdAt": "2025-11-15T10:30:00.000Z",
 *   "updatedAt": "2025-11-15T11:45:00.000Z"
 * }
 */
app.put('/todos/:id', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const todo = findTodoById(id);

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    // Validate update data with Zod
    const validatedData: TodoUpdate = todoUpdateSchema.parse(req.body);

    // Update todo properties
    Object.assign(todo, validatedData, { updatedAt: new Date() });

    res.json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Validation failed', details: error.message });
    } else {
      res.status(400).json({ error: 'Validation failed' });
    }
  }
});

/**
 * DELETE - DELETE /todos/:id
 * Permanently deletes a todo item from storage.
 * 
 * @route DELETE /todos/:id
 * @param {string} id - The unique identifier of the todo to delete
 * @returns {Object} 200 - Success message with the deleted todo object
 * @returns {Object} 404 - Error message if todo is not found
 * 
 * @example
 * // Response (200)
 * {
 *   "message": "Todo deleted successfully",
 *   "todo": {
 *     "id": "uuid-1",
 *     "title": "Learn TypeScript",
 *     "description": "Complete the TypeScript tutorial",
 *     "completed": true,
 *     "createdAt": "2025-11-15T10:30:00.000Z",
 *     "updatedAt": "2025-11-15T11:45:00.000Z"
 *   }
 * }
 */
app.delete('/todos/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
});

/**
 * Start the Express server and listen for incoming requests.
 * 
 * @listens {number} PORT - The port number (3000) where the server will listen
 * @fires console.log - Logs the server URL when successfully started
 */
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
