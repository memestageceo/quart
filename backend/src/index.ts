import express from 'express';
import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { todoSchema, todoUpdateSchema, type Todo, type TodoInput, type TodoUpdate } from './types.ts';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory storage
let todos: Todo[] = [];

// Helper function to find todo by id
const findTodoById = (id: string): Todo | undefined => {
  return todos.find(todo => todo.id === id);
};

// CREATE - POST /todos
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

// READ ALL - GET /todos
app.get('/todos', (_req: Request, res: Response): void => {
  res.json(todos);
});

// READ SINGLE - GET /todos/:id
app.get('/todos/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const todo = findTodoById(id);

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  res.json(todo);
});

// UPDATE - PUT /todos/:id
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

// DELETE - DELETE /todos/:id
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
