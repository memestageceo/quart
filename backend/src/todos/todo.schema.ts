import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

export const todoUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
