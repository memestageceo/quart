import type { Request, Response } from "express";
import { validate } from "../utils/validate.ts";
import { todoSchema, todoUpdateSchema } from "./todo.schema.ts";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./todo.service.ts";

export function createTodoHandler(req: Request, res: Response) {
  const data = validate(todoSchema, req.body, res) as {
    title: string;
    completed: boolean;
    description?: string;
  };
  if (!data) return;
  const todo = createTodo(data);
  res.status(201).json(todo);
}

export function getAllTodosHandler(req: Request, res: Response) {
  res.json(getAllTodos());
}

export function getTodoByIdHandler(req: Request, res: Response) {
  const todo = getTodoById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not Found" });
  res.json(todo);
}

export function updateTodoHandler(req: Request, res: Response) {
  const updates = validate(todoUpdateSchema, req.body, res);
  if (!updates) return;

  const updated = updateTodo(req.params.id, updates);
  if (!updated) return res.status(404).json({ message: "Not Found" });

  res.json(updated);
}

export function deleteTodoHandler(req: Request, res: Response) {
  const deleted = deleteTodo(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not Found" });

  res.status(204).send();
}
