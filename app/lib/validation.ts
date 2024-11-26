import { ZodError } from "zod";

export function formatZodError<T = any>(error: ZodError<T>) {
  const flatten = error.flatten().fieldErrors as Record<string, string[]>;
  return Object.fromEntries(Object.entries(flatten).map(([key, value]) => [key, value[0]]))
}