import type { Todo, TodoInput, TodoUpdate } from "./todo.types.ts";
import { randomUUID } from "crypto";

let todos: Todo[] = [];

export function createTodo(data: TodoInput): Todo {
  const todo: Todo = {
    id: randomUUID(),
    title: data.title,
    description: data.description ?? "",
    completed: data.completed ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todos.push(todo);
  return todo;
}

export function getAllTodos() {
  return todos;
}

export function getTodoById(id: string) {
  return todos.find((t) => t.id === id);
}

export function updateTodo(id: string, updates: TodoUpdate): Todo | null {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;

  Object.assign(todo, updates, { updatedAt: new Date() });
  return todo;
}

export function deleteTodo(id: string) {
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length < before;
}
