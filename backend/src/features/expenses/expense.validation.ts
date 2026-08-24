import { z } from "zod";

export const expenseSchema = z.object({
  body: z.object({
    cycleId: z.string(),
    category: z.string().min(2),
    amount: z.number().positive(),
    merchant: z.string().optional(),
    notes: z.string().optional(),
    spentAt: z.coerce.date().optional()
  })
});
