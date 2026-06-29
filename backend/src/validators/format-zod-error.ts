import { z } from "zod";

export interface ValidationError {
  field: string;
  message: string;
}

export const formatZodError = (
  error: z.ZodError
): ValidationError[] => {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};