import { z } from "zod";

export const salarySchema = z.object({
  body: z.object({
    salary: z.number().positive(),
    salaryCreditDay: z.number().int().min(1).max(31),
    resetMode: z.enum(["manual", "automatic"]).default("automatic"),
    formulaRule: z.enum(["50_30_20", "70_20_10", "60_20_20", "80_20", "ZERO_BASED", "PAY_YOURSELF_FIRST", "CUSTOM"]).default("50_30_20"),
    customAllocations: z.array(z.object({ key: z.string(), label: z.string(), percentage: z.number().min(0).max(100) })).optional()
  })
});
