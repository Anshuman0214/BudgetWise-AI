import { z } from "zod";

export const investmentPlanSchema = z.object({
  body: z.object({
    type: z.enum(["sip", "mutual_fund", "stock", "fixed_deposit", "real_estate", "emergency_fund", "retirement"]),
    name: z.string().min(2),
    principal: z.number().min(0),
    monthlyContribution: z.number().min(0).default(0),
    expectedAnnualReturn: z.number().min(0),
    horizonMonths: z.number().int().positive(),
    targetAmount: z.number().min(0).optional()
  })
});
