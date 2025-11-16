import { z } from "zod";

// Zod schema for validation
export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean().default(true),
});

export const todoUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// TypeScript types inferred from Zod schemas
export type TodoInput = z.infer<typeof todoSchema>;
export type TodoUpdate = z.infer<typeof todoUpdateSchema>;

// Full Todo model with ID + timestamps
export interface Todo extends TodoInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
