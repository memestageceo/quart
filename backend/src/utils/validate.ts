import type { ZodTypeAny } from "zod";
import type { Response } from "express";

export function validate(schema: ZodTypeAny, data: unknown, res: Response) {
  const result = schema.safeParse(data);

  if (!result.success) {
    res.status(400).json(result.error);
    return null;
  }

  return result.data;
}
